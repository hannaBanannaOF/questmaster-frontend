import { createHttpClient, Microservices } from '@/src/lib/http';

import { mapUserInfo } from '../user.mapper';
import { UserInfoResponse } from './dto.types';

const client = createHttpClient(Microservices.core);

export const getUserInfo = async () =>
  mapUserInfo(await client.get<UserInfoResponse>('user'));
