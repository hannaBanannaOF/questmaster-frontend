import type { HttpClient } from '@/src/lib/http';

import type { UserRepository } from '../application';
import type { User } from '../domain';
import type { UserInfoResponse } from './user.dto';

const toUser = (response: UserInfoResponse): User => ({
  username: response.username,
  name: response.name,
  surname: response.surname,
});

export const createUserHttpRepository = (http: HttpClient): UserRepository => ({
  async getCurrent() {
    return toUser(await http.get<UserInfoResponse>('user'));
  },
});
