import { CampaignCreateFormData } from '../domain/campaign.schema';
import { createCampaignAPI } from '../infra/campaign.api';

export const createCampaignUseCase = (data: CampaignCreateFormData) =>
  createCampaignAPI(data);
