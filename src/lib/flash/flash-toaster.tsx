'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { FLASH_COOKIE, type FlashMessage } from './flash-message';

function takeFlashCookie(): FlashMessage | null {
  const entry = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${FLASH_COOKIE}=`));
  if (!entry) return null;

  document.cookie = `${FLASH_COOKIE}=; Max-Age=0; path=/`;
  try {
    return JSON.parse(decodeURIComponent(entry.slice(FLASH_COOKIE.length + 1)));
  } catch {
    return null;
  }
}

/** Mostra o toast agendado por setFlash() a cada navegação. */
export function FlashToaster() {
  const pathname = usePathname();
  const { toast } = useToast();
  const t = useTranslations();

  useEffect(() => {
    const flash = takeFlashCookie();
    if (!flash) return;

    toast({
      type: flash.type,
      title: t(flash.title, flash.values),
      message: flash.message ? t(flash.message, flash.values) : undefined,
    });
  }, [pathname, toast, t]);

  return null;
}
