import type { UserRepository } from './user.repository';

export const makeGetCurrentUser = (users: UserRepository) => () =>
  users.getCurrent();
