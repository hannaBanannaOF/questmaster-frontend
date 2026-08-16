'use server';

import { campaignApiRepository } from '../../infra/campaign.api';
import { CampaignRepository } from '../campaign.repository';

export const getCampaignsUseCase = async (
  repo: CampaignRepository = campaignApiRepository,
) => await repo.getCampaigns();
