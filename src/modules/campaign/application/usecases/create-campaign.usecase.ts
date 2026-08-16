'use server';

import { campaignApiRepository } from '../../infra/campaign.api';
import {
  CampaignRepository,
  CreateCampaignInput,
} from '../campaign.repository';

export const createCampaignUseCase = async (
  data: CreateCampaignInput,
  repo: CampaignRepository = campaignApiRepository,
) => await repo.createCampaign(data);
