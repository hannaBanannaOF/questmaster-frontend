import 'server-only';

import { createHttpClient, Microservice } from '@/src/lib/http';

import {
  makeAcceptInvite,
  makeCreateInvite,
  makeGetInvite,
} from './application';
import { createInviteHttpRepository } from './infra/invite.http-repository';

// Composition root: liga os use cases às implementações de infra
const invites = createInviteHttpRepository(createHttpClient(Microservice.Core));

export const inviteUseCases = {
  createInvite: makeCreateInvite(invites),
  getInvite: makeGetInvite(invites),
  acceptInvite: makeAcceptInvite(invites),
};
