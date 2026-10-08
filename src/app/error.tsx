'use client';

import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button, EmptyState } from '@/src/design';

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
    <EmptyState
      title={t('errors.page.title')}
      message={t('errors.page.message')}
      icon={<TriangleAlert size={48} />}
      action={
        <Button
          variant="outline"
          icon={<RotateCcw size={16} />}
          onClick={reset}
        >
          {t('actions.retry')}
        </Button>
      }
    />
  );
}
