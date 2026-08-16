import { getTranslations } from 'next-intl/server';

import { Loader } from '@/src/design';

export default async function Loading() {
  const t = await getTranslations('campaign.list');
  return (
    <Loader size="lg" message={t('loading')} />
  );
}