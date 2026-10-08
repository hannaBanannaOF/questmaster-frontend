import 'server-only';

import { unstable_rethrow } from 'next/navigation';

import { AppError } from '../errors';

/**
 * Converte um erro de use case em mensagem para o usuário.
 * Erros internos do Next (redirect pro login, notFound) seguem adiante.
 */
export function toErrorMessage(error: unknown): string | undefined {
  unstable_rethrow(error);

  if (error instanceof AppError) return error.message;

  console.error(error);
  return undefined;
}
