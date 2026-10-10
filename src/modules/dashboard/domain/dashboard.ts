/** Abas do dashboard: o mesmo usuário pode jogar e mestrar. */
export type DashboardTab = 'player' | 'dm';

export function isDashboardTab(value: unknown): value is DashboardTab {
  return value === 'player' || value === 'dm';
}

/** Joga quem tem ficha ou já está numa campanha de outro mestre. */
export function hasPlayerRole(
  characterTotal: number,
  playerCampaignTotal: number,
) {
  return characterTotal > 0 || playerCampaignTotal > 0;
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
