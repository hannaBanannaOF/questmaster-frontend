import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import {
  mapCampaignDetails,
  mapCampaignFormData,
  mapCampaignList,
} from '../campaign.mapper';
import { CampaignCreateFormData } from '../domain/campaign.schema';
import { CampaignStatus } from '../domain/campaign-status.types';
import {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListResponse,
  UpdateCampaignStatusRequest,
  UpdateCampaignStatusResponse,
} from './dto.types';

const client = createHttpClient(Microservices.core);

export const getCampaignsAPI = async () =>
  mapCampaignList(await client.get<CampaignListResponse[]>('campaign'));

export const getCampaignDetailsAPI = async (id: number) =>
  mapCampaignDetails(
    await client.get<CampaignDetailsResponse>(`campaign/${id}`),
  );

export const createCampaignAPI = (data: CampaignCreateFormData) =>
  client.post<undefined, CampaignCreateRequest>(
    'campaign',
    mapCampaignFormData(data),
  );

export const deleteCampaignAPI = (id: number) =>
  client.delete(`campaign/${id}`);

export const updateCampaignStatusAPI = async (
  id: number,
  newStatus: CampaignStatus,
) => {
  const data = await client.patch<
    UpdateCampaignStatusResponse,
    UpdateCampaignStatusRequest
  >(`campaign/${id}/status`, {
    status: newStatus.toString(),
  });

  return CampaignStatus[data.status as keyof typeof CampaignStatus];
};
