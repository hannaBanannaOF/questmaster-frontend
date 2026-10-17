import 'server-only';

import { unstable_rethrow } from 'next/navigation';
import { cache } from 'react';

import { CampaignStatus, getCampaigns } from '@/src/modules/campaign';
import { getCharacters } from '@/src/modules/character';

import type { DashboardCampaigns, Loaded } from './dashboard.view-model';

/** Linhas de campanha antes do "Ver todas". */
export const CAMPAIGN_PREVIEW_SIZE = 5;
/** Uma fileira da grade de personagens no desktop. */
export const CHARACTER_PREVIEW_SIZE = 3;

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

// Prévias na ordem do último acesso (o total delas é o total do papel) e a
// campanha em andamento aberta por último em cada papel, para os destaques
async function loadCampaigns(): Promise<DashboardCampaigns> {
  const recent = { sort: 'recent', status: CampaignStatus.ACTIVE } as const;
  const [dm, dmWithoutPlayers, player, dmActive, playerActive] =
    await Promise.all([
      getCampaigns({ role: 'dm', sort: 'recent' }, 1, CAMPAIGN_PREVIEW_SIZE),
      getCampaigns(
        { role: 'dm', withoutPlayers: true, sort: 'recent' },
        1,
        CAMPAIGN_PREVIEW_SIZE,
      ),
      getCampaigns(
        { role: 'player', sort: 'recent' },
        1,
        CAMPAIGN_PREVIEW_SIZE,
      ),
      getCampaigns({ role: 'dm', ...recent }, 1, 1),
      getCampaigns({ role: 'player', ...recent }, 1, 1),
    ]);
  return {
    dm,
    dmWithoutPlayers,
    player,
    dmContinue: dmActive.items.at(0),
    playerContinue: playerActive.items.at(0),
  };
}

export const getDashboardData = cache(async () => {
  const [campaigns, characters] = await Promise.all([
    settle(loadCampaigns()),
    settle(getCharacters({ sort: 'recent' }, 1, CHARACTER_PREVIEW_SIZE)),
  ]);
  return { campaigns, characters };
});
