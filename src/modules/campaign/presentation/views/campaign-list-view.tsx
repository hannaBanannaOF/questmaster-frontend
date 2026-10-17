import { Dices, Link2 } from 'lucide-react';
import { unstable_rethrow } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import {
  Alert,
  ButtonLink,
  CollectionHeader,
  CollectionPage,
  ListState,
} from '@/src/design';
import { CriticalFailure } from '@/src/modules/shared/presentation';

import { getCampaigns } from '../campaign.loaders';
import type { CampaignListParams } from '../campaign-list.params';
import { CampaignListFilters } from '../components/campaign-list-filters/campaign-list-filters';
import { CampaignListResults } from '../components/campaign-list-results/campaign-list-results';
import { CampaignListSkeleton } from '../components/campaign-list-results/campaign-list-skeleton';
import { CreateCampaignButton } from '../components/create-campaign-button/create-campaign-button';

/** Total de campanhas do usuário, sem filtros; undefined se a busca falhou. */
async function countAllCampaigns() {
  try {
    return (await getCampaigns({}, 1, 1)).total;
  } catch (error) {
    unstable_rethrow(error);
    console.error(error);
    return undefined;
  }
}

export async function CampaignListView({
  params,
}: {
  params: CampaignListParams;
}) {
  const [total, t] = await Promise.all([
    countAllCampaigns(),
    getTranslations('campaign.list'),
  ]);

  const header = (
    <CollectionHeader
      title={t('title')}
      count={total || undefined}
      countLabel={total ? t('count', { count: total }) : undefined}
      action={
        <CreateCampaignButton label={t('new')} variant="primary" compactLabel />
      }
    />
  );

  // Erro e lista vazia não têm o que filtrar: a barra de filtros sai
  if (total === undefined) {
    return (
      <CollectionPage>
        {header}
        <CriticalFailure
          title={t('error.title')}
          message={t('error.message')}
          secondaryAction={
            <ButtonLink href="/" variant="tertiary">
              {t('error.back')}
            </ButtonLink>
          }
        />
      </CollectionPage>
    );
  }

  if (total === 0) {
    const tDashboard = await getTranslations('dashboard.welcome.invite');
    return (
      <CollectionPage>
        {header}
        <ListState
          id="campaigns-empty"
          icon={<Dices />}
          title={t('empty.title')}
          message={t('empty.message')}
          actions={
            <CreateCampaignButton label={t('empty.create')} variant="primary" />
          }
        />
        <Alert
          icon={<Link2 />}
          title={tDashboard('title')}
          description={tDashboard('message')}
        />
      </CollectionPage>
    );
  }

  return (
    <CollectionPage>
      {header}
      <CampaignListFilters {...params} />
      {/* A key muda a cada busca, filtro ou página: só a lista vira esqueleto */}
      <Suspense
        key={`${params.q}-${params.role}-${params.status}-${params.page}`}
        fallback={<CampaignListSkeleton />}
      >
        <CampaignListResults {...params} />
      </Suspense>
    </CollectionPage>
  );
}
