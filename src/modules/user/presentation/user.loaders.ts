import 'server-only';

import { cache } from 'react';

import { userUseCases } from '../user.container';

/** Usuário logado; deduplicado por request com cache() do React. */
export const getCurrentUser = cache(() => userUseCases.getCurrentUser());
