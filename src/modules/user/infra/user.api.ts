
import { createHttpClient, Microservices } from '@/src/lib/http';

import { mapUserInfo } from '../user.mapper';
import { UserInfoResponse } from './dto.types';

export async function getUserInfo() {
  const client = createHttpClient(Microservices.core);
  try {
    const data = await client.get<UserInfoResponse>('user');
    return mapUserInfo(data);
  } catch {
    // Should igonre errors here, it doesn't really matter
  }
}
