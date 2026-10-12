import 'server-only';

import { createHttpClient, Microservice } from '@/src/lib/http';

import {
  makeCountCampaignsByStatus,
  makeCreateCampaign,
  makeCreatePremadeCharacter,
  makeDeleteCampaign,
  makeDeletePremadeCharacter,
  makeGetCampaignBySlug,
  makeListCampaigns,
  makeRemoveCharacterFromCampaign,
  makeUpdateCampaignStatus,
} from './application';
import { createCampaignHttpRepository } from './infra/campaign.http-repository';

// Composition root: liga os use cases às implementações de infra
const campaigns = createCampaignHttpRepository(
  createHttpClient(Microservice.Core),
);

export const campaignUseCases = {
  listCampaigns: makeListCampaigns(campaigns),
  countCampaignsByStatus: makeCountCampaignsByStatus(campaigns),
  getCampaignBySlug: makeGetCampaignBySlug(campaigns),
  createCampaign: makeCreateCampaign(campaigns),
  deleteCampaign: makeDeleteCampaign(campaigns),
  updateCampaignStatus: makeUpdateCampaignStatus(campaigns),
  createPremadeCharacter: makeCreatePremadeCharacter(campaigns),
  deletePremadeCharacter: makeDeletePremadeCharacter(campaigns),
  removeCharacterFromCampaign: makeRemoveCharacterFromCampaign(campaigns),
};
