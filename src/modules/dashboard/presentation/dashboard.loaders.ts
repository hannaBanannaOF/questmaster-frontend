import 'server-only';

import { unstable_rethrow } from 'next/navigation';
import { cache } from 'react';

import { getCampaigns } from '@/src/modules/campaign';
import { getCharacters } from '@/src/modules/character';

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

export const getDashboardData = cache(async () => {
  const [campaigns, characters, idleCharacters] = await Promise.all([
    settle(getCampaigns()),
    settle(getCharacters()),
    settle(getCharacters({ withoutCampaign: true })),
  ]);
  return { campaigns, characters, idleCharacters };
});
