'use client';

import { createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from '@mantine/notifications';
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import dayjs from "dayjs";
import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';
import { useLocale } from "next-intl";
import { Shell } from "../components/shell/shell";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Provider({children} : {children: React.ReactNode}) {

  const client = getQueryClient();

  const myColor: MantineColorsTuple = [
    "#fff4e1",
    "#ffe8cc",
    "#fed09b",
    "#fdb766",
    "#fca13a",
    "#fc931d",
    "#fc8c0c",
    "#e17800",
    "#c86a00",
    "#af5a00"
  ];

  const theme = createTheme({
    primaryColor: 'questmaster',
    cursorType: 'pointer',
    colors: {
      'questmaster': myColor,
    },
    fontFamily: 'Newsreader, serif'
  });

  const locale = useLocale().toLocaleLowerCase();
  dayjs.locale(locale)

  return (
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <DatesProvider settings={{ locale: locale, firstDayOfWeek: 0 }}>
              <Notifications limit={5} />
              <Shell>
                {children}
              </Shell>
            </DatesProvider>
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
  )
}