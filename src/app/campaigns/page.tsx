import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  CampaignListView,
  parseCampaignListParams,
  type SearchParams,
} from '@/src/modules/campaign';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('campaign.list');
  return { title: t('title') };
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <CampaignListView params={parseCampaignListParams(await searchParams)} />
  );
}
