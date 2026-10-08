import type { CampaignSummary } from '@/src/modules/campaign/domain';
import { CampaignStatus } from '@/src/modules/campaign/domain';
import type { CharacterSummary } from '@/src/modules/character/domain';

/** Abas do dashboard: o mesmo usuário pode jogar e mestrar. */
export type DashboardTab = 'player' | 'dm';

export function isDashboardTab(value: unknown): value is DashboardTab {
  return value === 'player' || value === 'dm';
}

export interface CampaignsByRole {
  dm: CampaignSummary[];
  player: CampaignSummary[];
}

export function splitCampaignsByRole(
  campaigns: CampaignSummary[],
): CampaignsByRole {
  return {
    dm: campaigns.filter((campaign) => campaign.isDm),
    player: campaigns.filter((campaign) => !campaign.isDm),
  };
}

/** Joga quem tem ficha ou já está numa campanha de outro mestre. */
export function hasPlayerRole(
  characters: CharacterSummary[],
  playerCampaigns: CampaignSummary[],
) {
  return characters.length > 0 || playerCampaigns.length > 0;
}

interface RolePresence {
  hasPlayer: boolean;
  hasDm: boolean;
}

/**
 * A aba pedida na URL vence; sem ela, abre a que tem conteúdo
 * (jogador primeiro, que é o caso mais comum).
 */
export function resolveDashboardTab(
  requested: unknown,
  { hasPlayer, hasDm }: RolePresence,
): DashboardTab {
  if (isDashboardTab(requested)) return requested;
  if (!hasPlayer && hasDm) return 'dm';
  return 'player';
}

/** Campanha do "continuar jogando": a primeira em andamento como jogador. */
export function pickContinueCampaign(playerCampaigns: CampaignSummary[]) {
  return playerCampaigns.find(
    (campaign) => campaign.status === CampaignStatus.ACTIVE,
  );
}

// O que pede atenção do mestre vem primeiro; arquivadas por último
const DM_STATUS_ORDER: readonly CampaignStatus[] = [
  CampaignStatus.ACTIVE,
  CampaignStatus.DRAFT,
  CampaignStatus.PAUSED,
  CampaignStatus.ARCHIVED,
];

export function sortDmCampaigns(campaigns: CampaignSummary[]) {
  return [...campaigns].sort(
    (a, b) =>
      DM_STATUS_ORDER.indexOf(a.status) - DM_STATUS_ORDER.indexOf(b.status),
  );
}

export function countCampaignsByStatus(campaigns: CampaignSummary[]) {
  return DM_STATUS_ORDER.map((status) => ({
    status,
    count: campaigns.filter((campaign) => campaign.status === status).length,
  }));
}
