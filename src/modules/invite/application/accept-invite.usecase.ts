import { acceptInviteAPI } from '../infra/invite.api';

export const acceptInviteUseCase = async (
  hash: string,
  characterSlug: string,
) => acceptInviteAPI(hash, characterSlug);
