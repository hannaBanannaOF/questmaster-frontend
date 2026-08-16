import { createHttpClient, Microservices } from '@/src/lib/http';

import { UserRepository } from '../application/user.repository';
import { UserInfoResponse } from './dto.types';
import { mapUserInfo } from './user.mapper';

const client = createHttpClient(Microservices.core);

export const userApiRepository: UserRepository = {
  async getUserInfo() {
    return mapUserInfo(await client.get<UserInfoResponse>('user'));
  },
};
