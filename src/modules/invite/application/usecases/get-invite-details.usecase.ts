'use server';

import { inviteApiRepository } from '../../infra/invite.api';
import { InviteRepository } from '../invite.repository';

export const getInviteDetailsUseCase = async (
  hash: string,
  repo: InviteRepository = inviteApiRepository,
) => await repo.getInviteDetails(hash);
