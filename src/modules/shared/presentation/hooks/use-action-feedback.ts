'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import { useToast } from '@/src/design';
import type { FormState } from '@/src/lib/actions';

/**
 * Traduz a mensagem de erro de uma action: erros de domínio vêm como chave
 * de tradução, erros da API vêm como texto, e sem mensagem cai no genérico.
 */
export function useErrorMessage() {
  const t = useTranslations();
  return useCallback(
    (message?: string) => {
      if (message && t.has(message)) return t(message);
      return message ?? t('common.errors.unexpected');
    },
    [t],
  );
}

/** Mostra um toast quando a action do form falha por um motivo que não é de campo. */
export function useFormErrorToast(state: FormState, titleKey: string) {
  const t = useTranslations();
  const { toast } = useToast();
  const errorMessage = useErrorMessage();

  useEffect(() => {
    if (state.status !== 'error' || state.fieldErrors) return;
    toast({
      type: 'error',
      title: t(titleKey),
      message: errorMessage(state.message),
    });
  }, [state, titleKey, t, toast, errorMessage]);
}
