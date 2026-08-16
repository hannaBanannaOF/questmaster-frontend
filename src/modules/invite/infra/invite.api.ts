import { createHttpClient, Microservices } from '@/src/lib/http';

import { InviteRepository } from '../application/invite.repository';
import { Invite } from '../domain';
import {
  AcceptInviteRequest,
  CreateInviteRequest,
  CreateInviteResponse,
  InviteDetailsResponse,
} from './dto.types';
import { mapDetailResponse } from './invite.mapper';

const client = createHttpClient(Microservices.core);

export const inviteApiRepository: InviteRepository = {
  async createInvite(campaignId: number): Promise<string> {
    const data = await client.post<CreateInviteResponse, CreateInviteRequest>(
      'invite',
      {
        campaign_id: campaignId,
      },
    );
    return data.hash;
  },

  async getInviteDetails(hash: string): Promise<Invite> {
    const response = await client.get<InviteDetailsResponse>(`invite/${hash}`);
    return mapDetailResponse(response);
  },

  async acceptInvite(hash: string, characterSlug: string): Promise<void> {
    await client.post<undefined, AcceptInviteRequest>(`invite/${hash}/accept`, {
      character_slug: characterSlug,
    });
  },
};
