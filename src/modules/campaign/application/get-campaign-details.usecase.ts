import { getCampaignDetailsAPI } from '../infra/campaign.api';

export async function getCampaignDetailsUseCase(id: number) {
  return await getCampaignDetailsAPI(id);
}
