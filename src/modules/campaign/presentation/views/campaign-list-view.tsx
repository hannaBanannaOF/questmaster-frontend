import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ListPage, Loader, PageHeader } from '@/src/design';

import type { CampaignListParams } from '../campaign-list.params';
import { CampaignListFilters } from '../components/campaign-list-filters/campaign-list-filters';
import { CampaignListResults } from '../components/campaign-list-results/campaign-list-results';
import { CreateCampaignButton } from '../components/create-campaign-button/create-campaign-button';

export async function CampaignListView({
  params,
}: {
  params: CampaignListParams;
}) {
  const t = await getTranslations('campaign.list');

  return (
    <ListPage
      header={
        <PageHeader
          title={t('title')}
          actions={<CreateCampaignButton label={t('new')} />}
        />
      }
    >
      <CampaignListFilters {...params} />
      {/* A key muda a cada página ou filtro: o Loader volta enquanto a nova página chega */}
      <Suspense
        key={`${params.role}-${params.status}-${params.page}`}
        fallback={<Loader size="lg" message={t('loading')} />}
      >
        <CampaignListResults {...params} />
      </Suspense>
    </ListPage>
  );
}
