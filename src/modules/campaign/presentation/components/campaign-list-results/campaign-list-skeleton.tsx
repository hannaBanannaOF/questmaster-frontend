import { useTranslations } from 'next-intl';

import {
  CollectionHeader,
  CollectionPage,
  CollectionSkeleton,
} from '@/src/design';

/** Linhas de esqueleto com a mesma altura das reais. */
export function CampaignListSkeleton() {
  const t = useTranslations('campaign.list');
  return <CollectionSkeleton layout="rows" loadingLabel={t('loading')} />;
}

/** Primeira carga da rota: o título real e as linhas em esqueleto. */
export function CampaignListLoading() {
  const t = useTranslations('campaign.list');
  return (
    <CollectionPage>
      <CollectionHeader title={t('title')} />
      <CampaignListSkeleton />
    </CollectionPage>
  );
}
