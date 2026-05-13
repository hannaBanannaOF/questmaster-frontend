'use client';

import { Plus, Scroll } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import {
  Button,
  Container,
  EmptyState,
  List,
  Loader,
  Title,
  useModal,
  useToast,
} from '@/src/design';
import {
  CampaignListCard,
  getCreateModalConfig,
  useCampaigns,
} from '@/src/modules/campaign';

export default function CampaignListPage() {
  const t = useTranslations('campaign.list');
  const toastT = useTranslations('campaign.toast');
  const { data, isFetching, isError } = useCampaigns();

  const searchParams = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    const error = searchParams.get('errorMsg');
    if (error) {
      addToast(toastT('error.detail'), error, 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, addToast, toastT]);

  const { openModal, closeModal } = useModal();
  const createT = useTranslations('campaign.create');
  const createModal = getCreateModalConfig(createT, closeModal);

  const handleCreateCampaignClick = useCallback(() => {
    openModal(createModal);
  }, [openModal, createModal]);

  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        {!isFetching && !isError && (
          <Button
            icon={<Plus display="flex" size={20} />}
            text={t('new')}
            onClick={handleCreateCampaignClick}
          />
        )}
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
            !isError && (
              <Button
                icon={<Plus display="flex" size={20} />}
                text={t('empty.create')}
                onClick={handleCreateCampaignClick}
              />
            )
          }
        />
      )}
    </Container>
  );
}
