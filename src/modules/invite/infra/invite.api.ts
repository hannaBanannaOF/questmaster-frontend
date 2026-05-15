import { createHttpClient, Microservices } from '@/src/lib/http';

import { mapDetailResponse } from '../invite.mapper';
import {
  AcceptInviteRequest,
  CreateInviteRequest,
  CreateInviteResponse,
  InviteDetailsResponse,
} from './dto.types';

const client = createHttpClient(Microservices.core);

export const createInviteAPI = async (campaignId: number) => {
  const data = await client.post<CreateInviteResponse, CreateInviteRequest>(
    'invite',
    {
      campaign_id: campaignId,
    },
  );
  return data.hash;
};

export const getInviteDetailsAPI = async (hash: string) =>
  mapDetailResponse(await client.get<InviteDetailsResponse>(`invite/${hash}`));

export const acceptInviteAPI = async (hash: string, characterSlug: string) =>
  await client.post<undefined, AcceptInviteRequest>(`invite/${hash}/accept`, {
    character_slug: characterSlug,
  });
