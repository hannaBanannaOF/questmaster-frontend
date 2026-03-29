import { RpgKind } from '../rpg/domain/rpg-kind.types';
import { Campaign } from './domain/campaign.types';
import { CampaignStatus } from './domain/campaign-status.types';
import { CampaignResponse } from './infra/dto.types';

export function mapCampaign(response: CampaignResponse): Campaign {
  return {
    slug: response.slug,
    name: response.name,
    system: RpgKind[response.system as keyof typeof RpgKind],
    dmed: response.is_dm,
    status: CampaignStatus[response.status as keyof typeof CampaignStatus],
  };
}

export function mapCampaignList(response: CampaignResponse[]): Campaign[] {
  return response.map(mapCampaign);
}
