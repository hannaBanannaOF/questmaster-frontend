import { getTranslations } from 'next-intl/server';

import { ListPage, PageHeader } from '@/src/design';

import { getCampaigns } from '../campaign.loaders';
import { CampaignList } from '../components/campaign-list/campaign-list';
import { CreateCampaignButton } from '../components/create-campaign-button/create-campaign-button';

export async function CampaignListView() {
  const [campaigns, t] = await Promise.all([
    getCampaigns(),
    getTranslations('campaign.list'),
  ]);

  return (
    <ListPage
      header={
        <PageHeader
          title={t('title')}
          actions={<CreateCampaignButton label={t('new')} />}
        />
      }
    >
      <CampaignList campaigns={campaigns} />
    </ListPage>
  );
}
