import 'server-only';

import { createHttpClient, Microservice } from '@/src/lib/http';

import { makeGetCurrentUser } from './application';
import { createUserHttpRepository } from './infra/user.http-repository';

// Composition root: liga os use cases às implementações de infra
const users = createUserHttpRepository(createHttpClient(Microservice.Core));

export const userUseCases = {
  getCurrentUser: makeGetCurrentUser(users),
};
