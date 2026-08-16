'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import { useModal, useToast } from '@/src/design';
import { useCampaigns } from '@/src/modules/campaign';

import { getCreateModalConfig } from '../../organisms';
import { CampaignList } from '../../templates/campaign-list/campaing-list.ui';

export function CampaignListView() {
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
    <CampaignList
      campaigns={data}
      hasError={isError}
      onCreateCampaignClick={handleCreateCampaignClick}
    />
  );
}
