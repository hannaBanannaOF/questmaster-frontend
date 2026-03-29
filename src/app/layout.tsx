import '../design/styles/index.css';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import locallizedFormat from 'dayjs/plugin/localizedFormat';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import { Header, Main, Nav, NavItem, Title } from '../design/design-system';
import { cinzel, nunito } from '../design/theme/styles/typography.style';
import { ThemeProvider } from '../design/theme/theme.provider';
import { QueryProvider } from '../lib/query/query.provider';

export const metadata: Metadata = {
  title: 'QuestMaster',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const stored = localStorage.getItem('QUESTMASTER_THEME');
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
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <Header brand={<Title order={2}>Questmaster</Title>}>
                <Nav>
                  <NavItem label={t('dashboard')} href="/" />
                  <NavItem label={t('campaigns')} href="/campaigns" />
                  <NavItem label={t('characters')} href="/characters" />
                </Nav>
              </Header>
              <Main>{children}</Main>
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
