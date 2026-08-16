'use server';

import { inviteApiRepository } from '../../infra/invite.api';
import { InviteRepository } from '../invite.repository';

export const createInviteUseCase = async (
  campaignId: number,
  repo: InviteRepository = inviteApiRepository,
) => await repo.createInvite(campaignId);
