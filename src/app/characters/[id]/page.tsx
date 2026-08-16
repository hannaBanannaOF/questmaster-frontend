import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import {
  CharacterDetailsView,
  characterQueries,
} from '@/src/modules/character';

export default async function CharacterDetailPage({
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
  await queryClient.prefetchQuery(characterQueries.detail(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterDetailsView id={id} />
    </HydrationBoundary>
  );
}
