import type { GameSystem } from '@/src/modules/rpg/domain';

import { CampaignStatus } from './campaign-status';

export interface CampaignSummary {
  slug: string;
  name: string;
  system: GameSystem;
  status: CampaignStatus;
  /** O usuário logado é o mestre (DM) da campanha. */
  isDm: boolean;
  playerCount: number;
}

export interface CampaignCharacter {
  id: number;
  name: string;
}

export interface CampaignDetails extends CampaignSummary {
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
