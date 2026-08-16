import { GameSystem } from '@/src/modules/rpg/domain/game-system.types';

import { CreateCampaignInput } from '../application/campaign.repository';
import { Campaign, CampaignDetails, CampaignStatus } from '../domain';
import {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
} from './dto.types';

const toGameSystem = (val: string) =>
  GameSystem[val as keyof typeof GameSystem];
const toCampaignStatus = (val: string) =>
  CampaignStatus[val as keyof typeof CampaignStatus];

export const mapCampaignList = (
  response: CampaignListResponse[],
): Campaign[] =>
  response.map((campaign) => ({
    slug: campaign.slug,
    name: campaign.name,
    system: toGameSystem(campaign.system),
    dmed: campaign.is_dm,
    status: toCampaignStatus(campaign.status),
    playerCount: campaign.player_count,
  }));

export const mapCampaignDetails = (
  response: CampaignDetailsResponse,
): CampaignDetails => ({
  id: response.id,
  dmed: response.is_dm,
  name: response.name,
  playerCount: response.characters.length,
  slug: response.slug,
  status: toCampaignStatus(response.status),
  system: toGameSystem(response.system),
  overview: response.overview,
  characters: response.characters,
  inviteHash: response.invite_hash,
});

export const mapCampaignCreateInput = (
  data: CreateCampaignInput,
): CampaignCreateRequest => ({
  name: data.name,
  system: data.system,
  overview: data.overview,
});
