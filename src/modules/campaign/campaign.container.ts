import 'server-only';

import { createHttpClient, Microservice } from '@/src/lib/http';

import {
  makeCreateCampaign,
  makeDeleteCampaign,
  makeGetCampaignBySlug,
  makeListCampaigns,
  makeUpdateCampaignStatus,
} from './application';
import { createCampaignHttpRepository } from './infra/campaign.http-repository';

// Composition root: liga os use cases às implementações de infra
const campaigns = createCampaignHttpRepository(
  createHttpClient(Microservice.Core),
);

export const campaignUseCases = {
  listCampaigns: makeListCampaigns(campaigns),
  getCampaignBySlug: makeGetCampaignBySlug(campaigns),
  createCampaign: makeCreateCampaign(campaigns),
  deleteCampaign: makeDeleteCampaign(campaigns),
  updateCampaignStatus: makeUpdateCampaignStatus(campaigns),
};
