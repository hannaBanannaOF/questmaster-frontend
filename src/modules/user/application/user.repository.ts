import { UserInfo } from '../domain/user.types';

export interface UserRepository {
  getUserInfo(): Promise<UserInfo>;
}
