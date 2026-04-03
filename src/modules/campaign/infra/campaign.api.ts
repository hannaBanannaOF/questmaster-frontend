import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapCampaignList } from '../campaign.mapper';
import { CampaignListResponse } from './dto.types';

export async function getCampaignsAPI() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CampaignListResponse[]>('campaign');
  return mapCampaignList(data);
}
