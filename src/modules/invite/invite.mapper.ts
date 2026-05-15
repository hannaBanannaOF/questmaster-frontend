import { GameSystem } from '../rpg';
import { Invite } from './domain/invite.types';
import { InviteDetailsResponse } from './infra/dto.types';

const toGameSystem = (val: string) =>
  GameSystem[val as keyof typeof GameSystem];

export const mapDetailResponse = (data: InviteDetailsResponse): Invite => ({
  inviteHash: data.invite_hash,
  campaignSlug: data.campaign_slug,
  campaignName: data.campaign_name,
  campaignPlayerCount: data.campaign_player_count,
  campaignSystem: toGameSystem(data.campaign_system),
  campaignOverview: data.campaign_overview,
});
