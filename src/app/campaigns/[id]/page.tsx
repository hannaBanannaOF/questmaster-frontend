'use client';

import { useParams } from 'next/navigation';

import { useCampaignDetails } from '@/src/modules/campaign/presentation/campaign.hooks';
import { CampaignDetailsContainer } from '@/src/modules/campaign/presentation/campaign.ui';

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

  const { data, isFetching } = useCampaignDetails(id);
  return (
    data && <CampaignDetailsContainer campaign={data} loading={isFetching} />
  );
}
