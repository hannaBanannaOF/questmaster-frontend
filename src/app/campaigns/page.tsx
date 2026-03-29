'use client';

import { Plus, Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Button,
  Container,
  EmptyState,
  List,
  Loader,
  Title,
} from '@/src/design/design-system';
import { useCampaigns } from '@/src/modules/campaign/presentation/campaign.hooks';
import { CampaignListCard } from '@/src/modules/campaign/presentation/campaign.ui';

export default function CampaignListPage() {
  const t = useTranslations('campaign.list');

  const { data, isFetching } = useCampaigns();

  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        <Button icon={<Plus display="flex" size={20} />} text={t('new')} />
      </Container>
      {isFetching && !data ? (
        <Loader size="lg" message={t('loading')} />
      ) : (
        <List>
          {data?.map((c) => (
            <CampaignListCard campaign={c} key={c.slug} />
          ))}
        </List>
      )}
      {!isFetching && (!data || data.length === 0) && (
        <EmptyState
          title={t('empty.title')}
          message={t('empty.message')}
          icon={<Scroll size={48} display="flex" />}
          extra={
            <Button
              icon={<Plus display="flex" size={20} />}
              text={t('empty.create')}
            />
          }
        />
      )}
    </Container>
  );
}
