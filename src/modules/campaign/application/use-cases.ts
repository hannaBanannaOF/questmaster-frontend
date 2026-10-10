import type { PageRequest } from '@/src/lib/pagination';

import {
  CampaignNotDeletableError,
  type CampaignRole,
  type CampaignStatus,
  canDeleteCampaign,
  canTransition,
  InvalidStatusTransitionError,
} from '../domain';
import type {
  CampaignListFilters,
  CampaignRepository,
  CreateCampaignInput,
} from './campaign.repository';

export const makeListCampaigns =
  (campaigns: CampaignRepository) =>
  (filters: CampaignListFilters, page: PageRequest) =>
    campaigns.list(filters, page);

export const makeCountCampaignsByStatus =
  (campaigns: CampaignRepository) => (role?: CampaignRole) =>
    campaigns.countByStatus(role);

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
