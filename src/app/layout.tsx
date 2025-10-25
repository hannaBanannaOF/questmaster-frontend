
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locallizedFormat from "dayjs/plugin/localizedFormat";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from "next-intl/server";
import { Provider } from "./provider";

dayjs.extend(customParseFormat);
dayjs.extend(locallizedFormat);

export const metadata: Metadata = {
  title: "QuestMaster"
};

  const locale = await getLocale();
 
  const messages = await getMessages();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} formats={{
          dateTime: {
            long: {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }
          }
        }}>
          <Provider>
            {children}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
