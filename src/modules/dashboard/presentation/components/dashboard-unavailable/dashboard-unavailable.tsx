import { TriangleAlert } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { EmptyState } from '@/src/design';

import { RetryButton } from '../retry-button/retry-button';

/** Nem campanhas nem personagens responderam: não há o que mostrar em aba alguma. */
export async function DashboardUnavailable() {
  const t = await getTranslations('common');

  return (
    <EmptyState
      title={t('errors.page.title')}
      message={t('errors.page.message')}
      icon={<TriangleAlert size={48} />}
      action={<RetryButton label={t('actions.retry')} />}
    />
  );
}
