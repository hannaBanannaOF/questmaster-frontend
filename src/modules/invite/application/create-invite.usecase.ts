import { createInviteAPI } from '../infra/invite.api';

export const createInviteUseCase = async (campaignId: number) =>
  createInviteAPI(campaignId);
