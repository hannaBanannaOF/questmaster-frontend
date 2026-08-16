'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { useCampaignDetails } from '../../../campaign.hooks';
import { CampaignDetailsContainer } from '../../templates';

export function CampaignDetailsView({ id }: { id: number }) {
  const { data, isPending, isError, error } = useCampaignDetails(id);
  const router = useRouter();
  const { addToast } = useToast();
  const t = useTranslations('campaign.toast');

  useEffect(() => {
    if (isError) {
      addToast(t('error.detail'), error.message, 'error');
      router.replace('/campaigns');
    }
  }, [isError, router, error, addToast, t]);
  return (
    data && <CampaignDetailsContainer campaign={data} loading={isPending} />
  );
}
