import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CampaignListView } from '@/src/modules/campaign';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('campaign.list');
  return { title: t('title') };
}

export default function CampaignsPage() {
  return <CampaignListView />;
}
