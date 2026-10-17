import type { HttpClient } from '@/src/lib/http';
import { mapPage } from '@/src/lib/pagination';

import type { CampaignRepository } from '../application';
import type { CampaignStatus } from '../domain';
import type {
  CampaignCreateRequest,
  CampaignCreateResponse,
  CampaignDetailsResponse,
  CampaignListPageResponse,
  CampaignStatusCountsResponse,
  CampaignStatusRequest,
  CampaignStatusResponse,
  PremadeCharacterCreateRequest,
  SlugResolveResponse,
  TableNameRequest,
  TableNameResponse,
} from './campaign.dto';
import {
  toCampaignCreateRequest,
  toCampaignDetails,
  toCampaignListQuery,
  toCampaignStatusCounts,
  toCampaignSummary,
  toPremadeCharacterCreateRequest,
} from './campaign.mapper';

export const createCampaignHttpRepository = (
  http: HttpClient,
): CampaignRepository => ({
  async list(filters, page) {
    const response = await http.get<CampaignListPageResponse>(
      'campaign',
      toCampaignListQuery(filters, page),
    );
    return mapPage(response, toCampaignSummary);
  },

  async countByStatus(role) {
    return toCampaignStatusCounts(
      await http.get<CampaignStatusCountsResponse>('campaign/counts', {
        role,
      }),
    );
  },

  async findById(id) {
    return toCampaignDetails(
      await http.get<CampaignDetailsResponse>(`campaign/${id}`),
    );
  },

  async resolveSlug(slug) {
    const response = await http.get<SlugResolveResponse>(
      `campaign/resolve/${encodeURIComponent(slug)}`,
    );
    return response.id;
  },

  async create(input) {
    const response = await http.post<CampaignCreateResponse>(
      'campaign',
      toCampaignCreateRequest(input) satisfies CampaignCreateRequest,
    );
    return response.slug;
  },

  async updateTableName(id, name) {
    const response = await http.patch<TableNameResponse>(
      `campaign/${id}/table-name`,
      { name } satisfies TableNameRequest,
    );
    return response.name;
  },

  async delete(id) {
    await http.delete(`campaign/${id}`);
  },

  async updateStatus(id, status) {
    const response = await http.patch<CampaignStatusResponse>(
      `campaign/${id}/status`,
      { status } satisfies CampaignStatusRequest,
    );
    return response.status as CampaignStatus;
  },

  async createPremadeCharacter(campaignId, input) {
    await http.post<void>(
      `campaign/${campaignId}/character`,
      toPremadeCharacterCreateRequest(
        input,
      ) satisfies PremadeCharacterCreateRequest,
    );
  },

  async deletePremadeCharacter(characterId) {
    await http.delete(`character/${characterId}`);
  },

  async removeCharacter(campaignId, characterId) {
    await http.delete(`campaign/${campaignId}/character/${characterId}`);
  },
});
