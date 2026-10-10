import type { GameSystem } from '@/src/modules/rpg/domain';

/** Convite para uma campanha, identificado por um hash compartilhável. */
export interface Invite {
  hash: string;
  campaignSlug: string;
  campaignName: string;
  campaignOverview?: string;
  campaignPlayerCount: number;
  campaignSystem: GameSystem;
  /** Quem abriu o convite é o mestre da campanha (e não pode entrar como jogador). */
  isDm: boolean;
}

const HASH_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** O hash é um UUID; qualquer outra coisa no link não pode ser um convite. */
export function isInviteHash(value: string) {
  return HASH_PATTERN.test(value);
}

/** Caminho público do convite, compartilhado com os jogadores. */
export function getInvitePath(hash: string) {
  return `/join/${hash}`;
}
