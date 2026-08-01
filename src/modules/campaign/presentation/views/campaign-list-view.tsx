'use client';

import { Plus, Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import {
  Button,
  Container,
  EmptyState,
  List,
  Title,
  useModal,
  useToast,
} from '@/src/design';
import {
  CampaignListCard,
  getCreateModalConfig,
  useCampaigns,
} from '@/src/modules/campaign';


export function CampaignListView() {
  const t = useTranslations('campaign.list');
  const toastT = useTranslations('campaign.toast');
  const { data, isError } = useCampaigns();

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
        {!isError && (
          <Button
            icon={<Plus display="flex" size={20} />}
            text={t('new')}
            onClick={handleCreateCampaignClick}
          />
        )}
      </Container>
      {data && (
        <List>
          {data.map((c) => (
            <CampaignListCard campaign={c} key={c.slug} />
          ))}
        </List>
      )}
      {(!data || data.length === 0) && (
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

