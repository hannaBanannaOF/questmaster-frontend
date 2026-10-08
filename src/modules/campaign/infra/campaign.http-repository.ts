import type { HttpClient } from '@/src/lib/http';

import type { CampaignRepository } from '../application';
import type { CampaignStatus } from '../domain';
import type {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
  CampaignStatusRequest,
  CampaignStatusResponse,
  SlugResolveResponse,
} from './campaign.dto';
import {
  toCampaignCreateRequest,
  toCampaignDetails,
  toCampaignSummary,
} from './campaign.mapper';

export const createCampaignHttpRepository = (
  http: HttpClient,
): CampaignRepository => ({
  async list() {
    const response = await http.get<CampaignListResponse[]>('campaign');
    return response.map(toCampaignSummary);
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
    await http.post<void>(
      'campaign',
      toCampaignCreateRequest(input) satisfies CampaignCreateRequest,
    );
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
});
