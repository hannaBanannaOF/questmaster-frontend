import type { User } from '../domain';

export interface UserRepository {
  getCurrent(): Promise<User>;
}
