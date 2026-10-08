import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CreateCampaignInput } from '../application';
import type {
  CampaignDetails,
  CampaignStatus,
  CampaignSummary,
} from '../domain';
import type {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
} from './campaign.dto';

export const toCampaignSummary = (
  response: CampaignListResponse,
): CampaignSummary => ({
  slug: response.slug,
  name: response.name,
  system: response.system as GameSystem,
  status: response.status as CampaignStatus,
  isDm: response.is_dm,
  playerCount: response.player_count,
});

export const toCampaignDetails = (
  response: CampaignDetailsResponse,
): CampaignDetails => ({
  id: response.id,
  slug: response.slug,
  name: response.name,
  system: response.system as GameSystem,
  status: response.status as CampaignStatus,
  isDm: response.is_dm,
  overview: response.overview,
  characters: response.characters,
  playerCount: response.characters.length,
  inviteHash: response.invite_hash,
});

export const toCampaignCreateRequest = (
  input: CreateCampaignInput,
): CampaignCreateRequest => ({
  name: input.name,
  system: input.system,
  overview: input.overview,
});
