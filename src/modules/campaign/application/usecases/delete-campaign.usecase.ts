'use server';

import { campaignApiRepository } from '../../infra/campaign.api';
import { CampaignRepository } from '../campaign.repository';

export const deleteCampaignUseCase = async (
  id: number,
  repo: CampaignRepository = campaignApiRepository,
) => await repo.deleteCampaign(id);
