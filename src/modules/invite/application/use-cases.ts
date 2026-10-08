import type { InviteRepository } from './invite.repository';

export const makeCreateInvite =
  (invites: InviteRepository) => (campaignId: number) =>
    invites.create(campaignId);

export const makeGetInvite = (invites: InviteRepository) => (hash: string) =>
  invites.findByHash(hash);

/** Aceita o convite com a ficha escolhida; devolve o convite para navegação. */
export const makeAcceptInvite =
  (invites: InviteRepository) =>
  async (hash: string, characterSlug: string) => {
    const invite = await invites.findByHash(hash);
    await invites.accept(hash, characterSlug);
    return invite;
  };
