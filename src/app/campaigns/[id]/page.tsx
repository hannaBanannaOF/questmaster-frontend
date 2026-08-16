import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { CampaignDetailsView, campaignQueries } from '@/src/modules/campaign';

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;

  if (!rawId || Array.isArray(rawId)) {
    throw new Error('Invalid id param');
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    throw new Error('Id must be a number');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(campaignQueries.detail(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CampaignDetailsView id={id} />
    </HydrationBoundary>
  );
}
