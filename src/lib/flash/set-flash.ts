import 'server-only';

import { cookies } from 'next/headers';

import { FLASH_COOKIE, type FlashMessage } from './flash-message';

/** Agenda um toast para a próxima página (lido e apagado pelo <FlashToaster>). */
export async function setFlash(message: FlashMessage) {
  // O Next já faz URL-encode do valor; o client decodifica com decodeURIComponent
  (await cookies()).set(FLASH_COOKIE, JSON.stringify(message), {
    path: '/',
    maxAge: 30,
    sameSite: 'lax',
    // Lido pelo client para exibir o toast; não carrega nada sensível
    httpOnly: false,
  });
}
