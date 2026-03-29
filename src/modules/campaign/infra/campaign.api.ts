import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapCampaignList } from '../campaign.mapper';
import { CampaignResponse } from './dto.types';

export async function getCampaigns() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CampaignResponse[]>('campaign');
  return mapCampaignList(data);
}
