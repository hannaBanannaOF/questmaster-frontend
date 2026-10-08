import type { Invite } from '../domain';

export interface InviteRepository {
  /** Cria (ou recupera) o convite da campanha e devolve o hash. */
  create(campaignId: number): Promise<string>;
  findByHash(hash: string): Promise<Invite>;
  accept(hash: string, characterSlug: string): Promise<void>;
}
