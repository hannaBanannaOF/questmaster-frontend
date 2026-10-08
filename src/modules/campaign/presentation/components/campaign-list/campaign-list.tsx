import { Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { EmptyState, List, ListItem } from '@/src/design';

import type { CampaignSummary } from '../../../domain';
import { CampaignCard } from '../campaign-card/campaign-card';
import { CreateCampaignButton } from '../create-campaign-button/create-campaign-button';

export function CampaignList({ campaigns }: { campaigns: CampaignSummary[] }) {
  const t = useTranslations('campaign.list');

  if (campaigns.length === 0) {
    return (
      <EmptyState
        title={t('empty.title')}
        message={t('empty.message')}
        icon={<Scroll size={48} />}
        action={<CreateCampaignButton label={t('empty.create')} />}
      />
    );
  }

  return (
    <List>
      {campaigns.map((campaign) => (
        <ListItem key={campaign.slug}>
          <CampaignCard campaign={campaign} />
        </ListItem>
      ))}
    </List>
  );
}
