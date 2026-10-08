import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { NotFoundError } from '@/src/lib/errors';

import { inviteUseCases } from '../invite.container';

export const getInvite = cache(async (hash: string) => {
  try {
    return await inviteUseCases.getInvite(hash);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});
