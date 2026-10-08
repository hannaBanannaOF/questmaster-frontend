import type { GameSystem } from '@/src/modules/rpg/domain';

/** Convite para uma campanha, identificado por um hash compartilhável. */
export interface Invite {
  hash: string;
  campaignSlug: string;
  campaignName: string;
  campaignOverview?: string;
  campaignPlayerCount: number;
  campaignSystem: GameSystem;
}

/** Caminho público do convite, compartilhado com os jogadores. */
export function getInvitePath(hash: string) {
  return `/join/${hash}`;
}
