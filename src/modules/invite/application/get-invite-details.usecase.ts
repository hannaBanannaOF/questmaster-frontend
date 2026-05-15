import { getInviteDetailsAPI } from '../infra/invite.api';

export const getInviteDetailsUseCase = async (hash: string) =>
  getInviteDetailsAPI(hash);
