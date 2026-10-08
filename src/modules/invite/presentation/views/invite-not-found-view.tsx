import { getTranslations } from 'next-intl/server';

import { ResourceNotFound } from '@/src/modules/shared/presentation';

export async function InviteNotFoundView() {
  const t = await getTranslations('invite.notFound');
  return (
    <ResourceNotFound
      title={t('title')}
      message={t('message')}
      backHref="/"
      backLabel={t('back')}
    />
  );
}
