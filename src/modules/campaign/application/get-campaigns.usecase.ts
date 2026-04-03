import { getCampaignsAPI } from '../infra/campaign.api';

export async function getCampaignsUseCase() {
  return await getCampaignsAPI();
}
