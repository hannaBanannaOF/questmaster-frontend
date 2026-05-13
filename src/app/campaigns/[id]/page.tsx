'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';
import {
  CampaignDetailsContainer,
  useCampaignDetails,
} from '@/src/modules/campaign';

export default function CampaignDetailPage() {
  const params = useParams();
  const rawId = params.id;

  if (!rawId || Array.isArray(rawId)) {
    throw new Error('Invalid id param');
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    throw new Error('Id must be a number');
  }

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
