import { CampaignStatus } from '../domain/campaign-status.types';
import { updateCampaignStatusAPI } from '../infra/campaign.api';

export const updateCampaignStatusUseCase = (
  id: number,
  newStatus: CampaignStatus,
) => updateCampaignStatusAPI(id, newStatus);
