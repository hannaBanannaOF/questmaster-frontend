import 'server-only';

import { unstable_rethrow } from 'next/navigation';
import { cache } from 'react';

import {
  CampaignStatus,
  getCampaignCounts,
  getCampaigns,
  totalCampaigns,
} from '@/src/modules/campaign';
import { getCharacters } from '@/src/modules/character';

/** Quantos itens cada prévia mostra antes do "Ver todos". */
export const PREVIEW_SIZE = 5;

/** Resultado de uma busca que pode falhar sem derrubar a página inteira. */
export type Loaded<T> = { ok: true; data: T } | { ok: false };

async function settle<T>(promise: Promise<T>): Promise<Loaded<T>> {
  try {
    return { ok: true, data: await promise };
  } catch (error) {
    // Sessão expirada e afins seguem o fluxo do Next; o resto vira erro de seção
    unstable_rethrow(error);
    console.error(error);
    return { ok: false };
  }
}

// Só o que a tela mostra, na ordem do último acesso: contagens, prévias e a
// campanha em andamento aberta por último (que pode não estar entre as 5 recentes)
async function loadCampaigns() {
  const [dmCounts, playerCounts, dmPreview, playerPreview, active] =
    await Promise.all([
      getCampaignCounts('dm'),
      getCampaignCounts('player'),
      getCampaigns({ role: 'dm', sort: 'recent' }, 1, PREVIEW_SIZE),
      getCampaigns({ role: 'player', sort: 'recent' }, 1, PREVIEW_SIZE),
      getCampaigns(
        { role: 'player', status: CampaignStatus.ACTIVE, sort: 'recent' },
        1,
        1,
      ),
    ]);
  return {
    dmCounts,
    dmTotal: totalCampaigns(dmCounts),
    playerTotal: totalCampaigns(playerCounts),
    dmPreview,
    playerPreview,
    continueCampaign: active.items.at(0),
  };
}

export type DashboardCampaigns = Awaited<ReturnType<typeof loadCampaigns>>;

export const getDashboardData = cache(async () => {
  const [campaigns, characters, idleCharacters] = await Promise.all([
    settle(loadCampaigns()),
    settle(getCharacters({ sort: 'recent' }, 1, PREVIEW_SIZE)),
    settle(getCharacters({ withoutCampaign: true }, 1, PREVIEW_SIZE)),
  ]);
  return { campaigns, characters, idleCharacters };
});
