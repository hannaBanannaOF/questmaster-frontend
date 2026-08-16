import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { CampaignListView, campaignQueries } from '@/src/modules/campaign';

export default async function CampaignPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(campaignQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CampaignListView />
    </HydrationBoundary>
  );
}
