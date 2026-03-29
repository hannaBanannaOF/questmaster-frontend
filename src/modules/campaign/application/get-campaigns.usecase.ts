import { getCampaigns } from '../infra/campaign.api';

export async function getCampaignsUseCase() {
  return await getCampaigns();
}
