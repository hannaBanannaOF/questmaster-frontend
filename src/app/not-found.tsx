import { ChevronLeft, MapIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, ListState } from '@/src/design';

export default async function NotFound() {
  const t = await getTranslations('common');
  return (
    <ListState
      id="not-found"
      headingLevel={1}
      icon={<MapIcon />}
      title={t('errors.notFound.title')}
      message={t('errors.notFound.message')}
      actions={
        <ButtonLink
          href="/"
          variant="secondary"
          icon={<ChevronLeft size={18} />}
        >
          {t('actions.goDashboard')}
        </ButtonLink>
      }
    />
  );
}
