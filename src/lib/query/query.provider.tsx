'use client';
import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';

import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();
  broadcastQueryClient({
    queryClient: client,
    broadcastChannel: 'questmaster-sync'
  });

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
