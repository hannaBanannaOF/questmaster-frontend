import {
  CampaignNotDeletableError,
  type CampaignStatus,
  canDeleteCampaign,
  canTransition,
  InvalidStatusTransitionError,
} from '../domain';
import type {
  CampaignRepository,
  CreateCampaignInput,
} from './campaign.repository';

export const makeListCampaigns = (campaigns: CampaignRepository) => () =>
  campaigns.list();

export const makeGetCampaignBySlug =
  (campaigns: CampaignRepository) => async (slug: string) =>
    campaigns.findById(await campaigns.resolveSlug(slug));

export const makeCreateCampaign =
  (campaigns: CampaignRepository) => (input: CreateCampaignInput) =>
    campaigns.create(input);

export const makeDeleteCampaign =
  (campaigns: CampaignRepository) => async (id: number) => {
    const campaign = await campaigns.findById(id);
    if (!canDeleteCampaign(campaign)) throw new CampaignNotDeletableError();
    await campaigns.delete(id);
    return campaign;
  };

export const makeUpdateCampaignStatus =
  (campaigns: CampaignRepository) =>
  async (id: number, nextStatus: CampaignStatus) => {
    const campaign = await campaigns.findById(id);
    if (!campaign.isDm || !canTransition(campaign.status, nextStatus)) {
      throw new InvalidStatusTransitionError();
    }
    return campaigns.updateStatus(id, nextStatus);
  };
