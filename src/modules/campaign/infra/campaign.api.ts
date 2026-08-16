import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import {
  CampaignRepository,
  CreateCampaignInput,
} from '../application/campaign.repository';
import { Campaign, CampaignDetails, CampaignStatus } from '../domain';
import {
  mapCampaignCreateInput,
  mapCampaignDetails,
  mapCampaignList,
} from './campaign.mapper';
import {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
  UpdateCampaignStatusRequest,
  UpdateCampaignStatusResponse,
} from './dto.types';

const client = createHttpClient(Microservices.core);

export const campaignApiRepository: CampaignRepository = {
  async getCampaigns(): Promise<Campaign[]> {
    const response = await client.get<CampaignListResponse[]>('campaign');
    return mapCampaignList(response);
  },

  async getCampaignDetails(id: number): Promise<CampaignDetails> {
    const response = await client.get<CampaignDetailsResponse>(
      `campaign/${id}`,
    );
    return mapCampaignDetails(response);
  },

  async createCampaign(data: CreateCampaignInput): Promise<void> {
    await client.post<undefined, CampaignCreateRequest>(
      'campaign',
      mapCampaignCreateInput(data),
    );
  },

  async deleteCampaign(id: number): Promise<void> {
    await client.delete(`campaign/${id}`);
  },

  async updateCampaignStatus(
    id: number,
    newStatus: CampaignStatus,
  ): Promise<CampaignStatus> {
    const data = await client.patch<
      UpdateCampaignStatusResponse,
      UpdateCampaignStatusRequest
    >(`campaign/${id}/status`, {
      status: newStatus.toString(),
    });

    return CampaignStatus[data.status as keyof typeof CampaignStatus];
  },
};
