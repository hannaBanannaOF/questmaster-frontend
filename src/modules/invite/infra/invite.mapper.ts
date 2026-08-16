import { GameSystem } from '@/src/modules/rpg';

import { Invite } from '../domain';
import { InviteDetailsResponse } from './dto.types';

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
