import { getCampaignDetailsAPI } from '../infra/campaign.api';

export const getCampaignDetailsUseCase = (id: number) =>
  getCampaignDetailsAPI(id);
