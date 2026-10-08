import { getTranslations } from 'next-intl/server';

import { ResourceNotFound } from '@/src/modules/shared/presentation';

export async function CampaignNotFoundView() {
  const t = await getTranslations('campaign.detail.notFound');
  return (
    <ResourceNotFound
      title={t('title')}
      message={t('message')}
      backHref="/campaigns"
      backLabel={t('back')}
    />
  );
}
