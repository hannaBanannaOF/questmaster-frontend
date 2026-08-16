import { Invite } from '../domain';

export interface InviteRepository {
  createInvite(campaignId: number): Promise<string>;
  getInviteDetails(hash: string): Promise<Invite>;
  acceptInvite(hash: string, characterSlug: string): Promise<void>;
}
