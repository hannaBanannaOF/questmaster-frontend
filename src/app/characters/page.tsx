import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { CharacterListView, characterQueries } from '@/src/modules/character';

export default async function CharacterListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(characterQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterListView />
    </HydrationBoundary>
  );
}
