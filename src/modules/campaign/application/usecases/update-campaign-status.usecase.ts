'use server';

import { CampaignStatus } from '../../domain';
import { campaignApiRepository } from '../../infra/campaign.api';
import { CampaignRepository } from '../campaign.repository';

export const updateCampaignStatusUseCase = async (
  id: number,
  newStatus: CampaignStatus,
  repo: CampaignRepository = campaignApiRepository,
) => await repo.updateCampaignStatus(id, newStatus);
