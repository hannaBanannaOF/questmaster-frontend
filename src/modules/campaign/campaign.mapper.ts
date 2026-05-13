import { GameSystem } from '../rpg/domain/game-system.types';
import { CampaignCreateFormData } from './domain/campaign.schema';
import { Campaign, CampaignDetails } from './domain/campaign.types';
import { CampaignStatus } from './domain/campaign-status.types';
import {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
} from './infra/dto.types';

const toGameSystem = (val: string) =>
  GameSystem[val as keyof typeof GameSystem];
const toCampaignStatus = (val: string) =>
  CampaignStatus[val as keyof typeof CampaignStatus];

export const mapCampaignList = (response: CampaignListResponse[]): Campaign[] =>
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

export const mapCampaignFormData = (
  data: CampaignCreateFormData,
): CampaignCreateRequest => ({
  name: data.name,
  system: data.game_system,
  overview: data.overview,
});
