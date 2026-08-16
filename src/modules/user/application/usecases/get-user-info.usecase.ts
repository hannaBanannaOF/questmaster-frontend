'use server';

import { userApiRepository } from '../../infra/user.api';
import { UserRepository } from '../user.repository';

export const getUserInfoUseCase = async (
  repo: UserRepository = userApiRepository,
) => await repo.getUserInfo();
