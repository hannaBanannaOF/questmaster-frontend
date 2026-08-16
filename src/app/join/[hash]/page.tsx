import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { InviteDetailsView, inviteQueries } from '@/src/modules/invite';

export default async function JoinCampaignPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash: rawHash } = await params;

  if (!rawHash || Array.isArray(rawHash)) {
    throw new Error('Invalid hash param');
  }

  const hash = String(rawHash);

  if (hash === '') {
    throw new Error('Hash must not be null');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(inviteQueries.detail(hash));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InviteDetailsView hash={hash} />
    </HydrationBoundary>
  );
}
