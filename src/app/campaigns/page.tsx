import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { CampaignListView } from '@/src/modules/campaign/presentation/views/campaign-list-view';
import { getCampaignsUseCase } from '@/src/modules/campaign';

export default async function CampaignPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaignsUseCase,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CampaignListView />
    </HydrationBoundary>
  );
}