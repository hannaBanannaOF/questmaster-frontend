import { getTranslations } from 'next-intl/server';

import { ResourceNotFound } from '@/src/modules/shared/presentation';

export default async function NotFound() {
  const t = await getTranslations('common');
  return (
    <ResourceNotFound
      title={t('errors.notFound.title')}
      message={t('errors.notFound.message')}
      backHref="/"
      backLabel={t('actions.backHome')}
    />
  );
}
