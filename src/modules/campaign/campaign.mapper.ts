import { GameSystem } from '../rpg/domain/game-system.types';
import { Campaign, CampaignDetails } from './domain/campaign.types';
import { CampaignStatus } from './domain/campaign-status.types';
import {
  CampaignDetailsResponse,
  CampaignListResponse,
} from './infra/dto.types';

export function mapCampaignList(response: CampaignListResponse[]): Campaign[] {
  return response.map((campaign) => {
    return {
      slug: campaign.slug,
      name: campaign.name,
      system: GameSystem[campaign.system as keyof typeof GameSystem],
      dmed: campaign.is_dm,
      status: CampaignStatus[campaign.status as keyof typeof CampaignStatus],
      playerCount: campaign.player_count,
    };
  });
}

export function mapCampaignDetails(
  response: CampaignDetailsResponse,
): CampaignDetails {
  return {
    id: response.id,
    dmed: response.is_dm,
    name: response.name,
    playerCount: response.characters.length,
    slug: response.slug,
    status: CampaignStatus[response.status as keyof typeof CampaignStatus],
    system: GameSystem[response.system as keyof typeof GameSystem],
    overview: response.overview,
    characters: response.characters,
    inviteHash: response.invite_hash,
  };
}
