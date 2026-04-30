import { CampaignStatus } from '../domain/campaign-status.types';
import { updateCampaignStatusAPI } from '../infra/campaign.api';

export async function updateCampaignStatusUseCase(
  id: number,
  newStatus: CampaignStatus,
) {
  return updateCampaignStatusAPI(id, newStatus);
}
