import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapUserInfo } from '../user.mapper';
import { UserInfoResponse } from './dto.types';

export async function getUserInfo() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<UserInfoResponse>('user');
  return mapUserInfo(data);
}
