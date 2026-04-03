import { GameSystem } from '../rpg/domain/game-system.types';
import { Campaign } from './domain/campaign.types';
import { CampaignStatus } from './domain/campaign-status.types';
import { CampaignListResponse } from './infra/dto.types';

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
