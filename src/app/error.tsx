'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { ButtonLink } from '@/src/design';
import { CriticalFailure } from '@/src/modules/shared/presentation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Falhas ao carregar dados de qualquer página caem aqui (o header continua). */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <CriticalFailure
      headingLevel={1}
      title={t('errors.page.title')}
      message={t('errors.page.message')}
      onRetry={reset}
      secondaryAction={
        <ButtonLink href="/" variant="tertiary">
          {t('actions.goDashboard')}
        </ButtonLink>
      }
    />
  );
}
