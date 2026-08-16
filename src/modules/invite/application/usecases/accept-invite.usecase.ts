'use server';

import { inviteApiRepository } from '../../infra/invite.api';
import { InviteRepository } from '../invite.repository';

export const acceptInviteUseCase = async (
  hash: string,
  characterSlug: string,
  repo: InviteRepository = inviteApiRepository,
) => await repo.acceptInvite(hash, characterSlug);
