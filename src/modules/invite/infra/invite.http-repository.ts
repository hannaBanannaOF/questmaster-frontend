import type { HttpClient } from '@/src/lib/http';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type { InviteRepository } from '../application';
import type { Invite } from '../domain';
import type {
  AcceptInviteRequest,
  CreateInviteRequest,
  CreateInviteResponse,
  InviteDetailsResponse,
} from './invite.dto';

const toInvite = (response: InviteDetailsResponse): Invite => ({
  hash: response.invite_hash,
  campaignSlug: response.campaign_slug,
  campaignName: response.campaign_name,
  campaignOverview: response.campaign_overview,
  campaignPlayerCount: response.campaign_player_count,
  campaignSystem: response.campaign_system as GameSystem,
});

export const createInviteHttpRepository = (
  http: HttpClient,
): InviteRepository => ({
  async create(campaignId) {
    const response = await http.post<CreateInviteResponse>('invite', {
      campaign_id: campaignId,
    } satisfies CreateInviteRequest);
    return response.hash;
  },

  async findByHash(hash) {
    return toInvite(
      await http.get<InviteDetailsResponse>(
        `invite/${encodeURIComponent(hash)}`,
      ),
    );
  },

  async accept(hash, characterSlug) {
    await http.post<void>(`invite/${encodeURIComponent(hash)}/accept`, {
      character_slug: characterSlug,
    } satisfies AcceptInviteRequest);
  },
});
