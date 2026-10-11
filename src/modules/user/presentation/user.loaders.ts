import 'server-only';

import { unstable_rethrow } from 'next/navigation';
import { cache } from 'react';

import type { User } from '../domain';
import { userUseCases } from '../user.container';

/** Usuário logado; deduplicado por request com cache() do React. */
export const getCurrentUser = cache(() => userUseCases.getCurrentUser());

/** Para cabeçalho e saudações: uma falha aqui não derruba a página. */
export const getCurrentUserOrNull = cache(async (): Promise<User | null> => {
  try {
    return await getCurrentUser();
  } catch (error) {
    // Sessão expirada vira redirect pro login; outras falhas só escondem o nome
    unstable_rethrow(error);
    return null;
  }
});
