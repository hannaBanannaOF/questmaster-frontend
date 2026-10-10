import type { GameSystem } from '@/src/modules/rpg/domain';

import { CampaignStatus } from './campaign-status';

/** Ficha citada numa campanha, só o necessário para mostrar e linkar. */
export interface CampaignCharacterRef {
  slug: string;
  name: string;
}

export interface CampaignSummary {
  slug: string;
  name: string;
  system: GameSystem;
  status: CampaignStatus;
  /** O usuário logado é o mestre (DM) da campanha. */
  isDm: boolean;
  playerCount: number;
  /** Fichas do usuário logado nessa campanha; vazio quando ele só mestra. */
  myCharacters: CampaignCharacterRef[];
}

/** Papel do usuário numa campanha: quem mestra ou quem joga. */
export type CampaignRole = 'dm' | 'player';

export function isCampaignRole(value: unknown): value is CampaignRole {
  return value === 'dm' || value === 'player';
}

/** Quantas campanhas o usuário tem em cada status (todos presentes). */
export type CampaignStatusCounts = Record<CampaignStatus, number>;

// O que pede atenção vem primeiro; arquivadas por último
const STATUS_ORDER: readonly CampaignStatus[] = [
  CampaignStatus.ACTIVE,
  CampaignStatus.DRAFT,
  CampaignStatus.PAUSED,
  CampaignStatus.ARCHIVED,
];

export function orderStatusCounts(counts: CampaignStatusCounts) {
  return STATUS_ORDER.map((status) => ({ status, count: counts[status] }));
}

export function totalCampaigns(counts: CampaignStatusCounts) {
  return STATUS_ORDER.reduce((sum, status) => sum + counts[status], 0);
}

export interface CampaignCharacter {
  id: number;
  name: string;
}

// O detalhe não traz as fichas do usuário: isso só vem na lista
export interface CampaignDetails extends Omit<CampaignSummary, 'myCharacters'> {
  id: number;
  overview?: string;
  characters: CampaignCharacter[];
  inviteHash?: string;
}

type CampaignAccess = Pick<CampaignSummary, 'isDm' | 'status'>;

/** Só o DM gerencia a campanha (status, convites, exclusão). */
export function canManageCampaign(campaign: CampaignAccess) {
  return campaign.isDm;
}

/** Só dá para excluir campanhas que ainda não começaram ou já terminaram. */
export function canDeleteCampaign(campaign: CampaignAccess) {
  return (
    campaign.isDm &&
    (campaign.status === CampaignStatus.DRAFT ||
      campaign.status === CampaignStatus.ARCHIVED)
  );
}

/**
 * Convites valem enquanto a campanha não terminou: pausada ainda recebe
 * jogadores, só arquivada não (mesma regra do core).
 */
export function canInviteToCampaign(campaign: CampaignAccess) {
  return campaign.isDm && campaign.status !== CampaignStatus.ARCHIVED;
}
