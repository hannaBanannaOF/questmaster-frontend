'use server';

import { campaignApiRepository } from '../../infra/campaign.api';
import { CampaignRepository } from '../campaign.repository';

export const getCampaignDetailsUseCase = async (
  id: number,
  repo: CampaignRepository = campaignApiRepository,
) => await repo.getCampaignDetails(id);
