import type { Metadata } from 'next';

import { CampaignDetailsView, getCampaignBySlug } from '@/src/modules/campaign';

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  return { title: campaign.name };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  return <CampaignDetailsView slug={slug} />;
}
