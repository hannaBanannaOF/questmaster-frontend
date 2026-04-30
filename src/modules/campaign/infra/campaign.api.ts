import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapCampaignDetails, mapCampaignList } from '../campaign.mapper';
import { CampaignStatus } from '../domain/campaign-status.types';
import {
  CampaignDetailsResponse,
  CampaignListResponse,
  UpdateCampaignStatusRequest,
  UpdateCampaignStatusResponse,
} from './dto.types';

export async function getCampaignsAPI() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CampaignListResponse[]>('campaign');
  return mapCampaignList(data);
}

export async function getCampaignDetailsAPI(id: number) {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CampaignDetailsResponse>(`campaign/${id}`);
  return mapCampaignDetails(data);
}

export async function updateCampaignStatusAPI(
  id: number,
  newStatus: CampaignStatus,
) {
  const client = createHttpClient(Microservices.core);
  const data = await client.patch<
    UpdateCampaignStatusResponse,
    UpdateCampaignStatusRequest
  >(`campaign/${id}/status`, {
    status: newStatus.toString(),
  });
  return CampaignStatus[data.status as keyof typeof CampaignStatus];
}
