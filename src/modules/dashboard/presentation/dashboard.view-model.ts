// ViewModel do dashboard: decide o que cada parte da tela mostra a partir das
// buscas. Puro (sem React nem I/O) para a tabela de estados ser testável; as
// views só desenham o que vem daqui.
import type { Page } from '@/src/lib/pagination';
import type { CampaignSummary } from '@/src/modules/campaign/domain';
import type { CharacterSummary } from '@/src/modules/character/domain';

import {
  type DashboardTab,
  hasPlayerRole,
  resolveDashboardTab,
} from '../domain';

/** Resultado de uma busca que pode falhar sem derrubar a página inteira. */
export type Loaded<T> = { ok: true; data: T } | { ok: false };

export interface DashboardCampaigns {
  dm: Page<CampaignSummary>;
  /** Campanhas do mestre em que ninguém entrou ("Precisa de você"). */
  dmWithoutPlayers: Page<CampaignSummary>;
  player: Page<CampaignSummary>;
  /** Em andamento e aberta por último, em cada papel. */
  dmContinue?: CampaignSummary;
  playerContinue?: CampaignSummary;
}

export interface DashboardData {
  campaigns: Loaded<DashboardCampaigns>;
  characters: Loaded<Page<CharacterSummary>>;
}

/** Seção que pode ter falhado; `total` é o da lista completa ("Ver todos"). */
export type SectionVM<T> =
  { ok: true; items: T[]; total: number } | { ok: false };

export interface PlayerPanelVM {
  tab: 'player';
  /** "Continuar jogando", "Pronto para a aventura" ou nada. */
  hero:
    { kind: 'continue'; campaign: CampaignSummary } | { kind: 'ready' } | null;
  characters: SectionVM<CharacterSummary>;
  /** null: seção escondida (o usuário ainda não joga em campanha). */
  campaigns: SectionVM<CampaignSummary> | null;
}

export type DmPanelVM =
  | {
      tab: 'dm';
      ok: true;
      hero?: CampaignSummary;
      campaigns: { items: CampaignSummary[]; total: number };
      needsYou: { items: CampaignSummary[]; total: number };
    }
  | { tab: 'dm'; ok: false };

export type DashboardVM =
  | { kind: 'unavailable' }
  | { kind: 'welcome' }
  | {
      kind: 'board';
      /** Abas só com os dois papéis (ou quando não dá para saber). */
      tabs: boolean;
      /** Sem abas: convite discreto para o papel que o usuário não tem. */
      nudge: DashboardTab | null;
      panel: PlayerPanelVM | DmPanelVM;
    };

const withoutSlug = (items: CampaignSummary[], slug?: string) =>
  items.filter((campaign) => campaign.slug !== slug);

function playerPanel({ campaigns, characters }: DashboardData): PlayerPanelVM {
  const charactersVM: SectionVM<CharacterSummary> = characters.ok
    ? { ok: true, ...characters.data }
    : { ok: false };

  // Sem campanhas não há destaque: ele vem delas
  if (!campaigns.ok) {
    return {
      tab: 'player',
      hero: null,
      characters: charactersVM,
      campaigns: { ok: false },
    };
  }

  const { player, playerContinue } = campaigns.data;
  if (player.total === 0) {
    const hasCharacters = characters.ok && characters.data.total > 0;
    return {
      tab: 'player',
      hero: hasCharacters ? { kind: 'ready' } : null,
      characters: charactersVM,
      campaigns: null,
    };
  }

  return {
    tab: 'player',
    hero: playerContinue
      ? { kind: 'continue', campaign: playerContinue }
      : null,
    characters: charactersVM,
    // O destaque não se repete na lista
    campaigns: {
      ok: true,
      items: withoutSlug(player.items, playerContinue?.slug),
      total: player.total,
    },
  };
}

function dmPanel({ campaigns }: DashboardData): DmPanelVM {
  if (!campaigns.ok) return { tab: 'dm', ok: false };

  const { dm, dmWithoutPlayers, dmContinue } = campaigns.data;
  // Cada campanha aparece uma vez só: destaque, "Campanhas" ou "Precisa de você"
  const needsYou = withoutSlug(dmWithoutPlayers.items, dmContinue?.slug);

  return {
    tab: 'dm',
    ok: true,
    hero: dmContinue,
    campaigns: {
      items: withoutSlug(dm.items, dmContinue?.slug).filter(
        (campaign) => campaign.playerCount > 0,
      ),
      total: dm.total,
    },
    needsYou: { items: needsYou, total: dmWithoutPlayers.total },
  };
}

export function buildDashboardViewModel(
  data: DashboardData,
  view?: string,
): DashboardVM {
  const { campaigns, characters } = data;

  // Tudo falhou: abas com dois erros empilhados só confundiriam
  if (!campaigns.ok && !characters.ok) return { kind: 'unavailable' };

  const playerTotal = campaigns.ok ? campaigns.data.player.total : 0;
  const hasPlayer = hasPlayerRole(
    characters.ok ? characters.data.total : 0,
    playerTotal,
  );
  const hasDm = campaigns.ok && campaigns.data.dm.total > 0;

  // Só é "primeiro acesso" quando as buscas responderam e não há nada
  if (campaigns.ok && characters.ok && !hasPlayer && !hasDm) {
    return { kind: 'welcome' };
  }

  // Busca que falhou não diz se o usuário tem aquele papel: mantém as abas
  const tabs = !campaigns.ok || (hasDm && (hasPlayer || !characters.ok));
  const active: DashboardTab = tabs
    ? resolveDashboardTab(view, { hasPlayer, hasDm })
    : hasDm
      ? 'dm'
      : 'player';
  const nudge: DashboardTab | null = tabs
    ? null
    : active === 'dm'
      ? 'player'
      : 'dm';

  return {
    kind: 'board',
    tabs,
    nudge,
    panel: active === 'dm' ? dmPanel(data) : playerPanel(data),
  };
}
