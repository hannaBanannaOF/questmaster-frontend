import '../design/styles/index.css';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import locallizedFormat from 'dayjs/plugin/localizedFormat';
import { ScrollText } from 'lucide-react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

import {
  Brand,
  Container,
  Header,
  Main,
  Nav,
  NavItem,
} from '../design/design-system';
import { cinzel, nunito } from '../design/theme/styles/typography.style';
import { ThemeProvider } from '../design/theme/theme.provider';
import { QueryProvider } from '../lib/query/query.provider';
import { UserTag } from '../modules/user/presentation/user.ui';

export const metadata: Metadata = {
  title: 'QuestMaster',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('common.header');
  const locale = await getLocale();
  const messages = await getMessages();

  dayjs.locale(locale);
  dayjs.extend(isToday);
  dayjs.extend(customParseFormat);
  dayjs.extend(locallizedFormat);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script src="/env-config.js" strategy="beforeInteractive" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const stored = localStorage.getItem('theme');
                const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored === 'dark' || stored === 'light'
                  ? stored
                  : (system ? 'dark' : 'light');

                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
            `,
          }}
        />
      </head>
      <body className={`${cinzel.variable} ${nunito.variable}`}>
        <NextTopLoader
          color="var(--color-primary)" // Cor do seu design system
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <Header
                brand={
                  <Brand
                    brandName="Questmaster"
                    subtitle="MANAGEMENT HUB"
                    icon={<ScrollText display="flex" />}
                  />
                }
              >
                <Nav>
                  <NavItem label={t('dashboard')} href="/" />
                  <NavItem label={t('campaigns')} href="/campaigns" />
                  <NavItem label={t('characters')} href="/characters" />
                </Nav>
                <Container>
                  <UserTag />
                </Container>
              </Header>
              <Main>{children}</Main>
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
