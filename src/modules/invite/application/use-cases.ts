import { NotFoundError } from '@/src/lib/errors';

import { isInviteHash } from '../domain';
import type { InviteRepository } from './invite.repository';

export const makeCreateInvite =
  (invites: InviteRepository) => (campaignId: number) =>
    invites.create(campaignId);

// Link malformado é convite inexistente: nem chega na API, que responderia 400
const findInvite = (invites: InviteRepository, hash: string) => {
  if (!isInviteHash(hash)) {
    return Promise.reject(new NotFoundError('Invite not found'));
  }
  return invites.findByHash(hash);
};

export const makeGetInvite = (invites: InviteRepository) => (hash: string) =>
  findInvite(invites, hash);

/** Aceita o convite com a ficha e o apelido; devolve o convite para navegação. */
export const makeAcceptInvite =
  (invites: InviteRepository) =>
  async (hash: string, characterSlug: string, playerName: string) => {
    const invite = await findInvite(invites, hash);
    await invites.accept(hash, characterSlug, playerName);
    return invite;
  };
