'use client';
import { Plus, Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, Container, EmptyState, List, Title } from '@/src/design';
import { Campaign } from '@/src/modules/campaign/domain';

import { CampaignListCard } from '../../molecules';

interface CampaignListProps {
  campaigns?: Campaign[];
  hasError?: boolean;
  onCreateCampaignClick(): void;
}

export function CampaignList({
  campaigns,
  hasError,
  onCreateCampaignClick,
}: CampaignListProps) {
  const t = useTranslations('campaign.list');

  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        {!hasError && (
          <Button
            icon={<Plus display="flex" size={20} />}
            text={t('new')}
            onClick={onCreateCampaignClick}
          />
        )}
      </Container>
      {campaigns && (
        <List>
          {campaigns.map((c) => (
            <CampaignListCard campaign={c} key={c.slug} />
          ))}
        </List>
      )}
      {(!campaigns || campaigns.length === 0) && (
        <EmptyState
          title={t('empty.title')}
          message={t('empty.message')}
          icon={<Scroll size={48} display="flex" />}
          extra={
            !hasError && (
              <Button
                icon={<Plus display="flex" size={20} />}
                text={t('empty.create')}
                onClick={onCreateCampaignClick}
              />
            )
          }
        />
      )}
    </Container>
  );
}
