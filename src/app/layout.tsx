import '@/src/design/foundations/global.css';

import { ScrollText } from 'lucide-react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { type ReactNode, Suspense } from 'react';

import {
  AppShell,
  Brand,
  fontVariables,
  Header,
  Nav,
  ThemeScript,
  ToastProvider,
} from '@/src/design';
import { FlashToaster } from '@/src/lib/flash/flash-toaster';
import { UserGreeting, UserGreetingSkeleton } from '@/src/modules/user';

export const metadata: Metadata = {
  title: { default: 'QuestMaster', template: '%s · QuestMaster' },
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
}: {
  children: ReactNode;
}) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('common.header'),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={fontVariables}>
        <NextTopLoader
          color="var(--color-primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <NextIntlClientProvider>
          <ToastProvider>
            <AppShell
              header={
                <Header
                  brand={
                    <Brand
                      name="Questmaster"
                      subtitle="MANAGEMENT HUB"
                      icon={<ScrollText size={24} />}
                    />
                  }
                  nav={
                    <Nav
                      label={t('navLabel')}
                      items={[
                        { href: '/', label: t('dashboard'), exact: true },
                        { href: '/campaigns', label: t('campaigns') },
                        { href: '/characters', label: t('characters') },
                      ]}
                    />
                  }
                  actions={
                    // O header renderiza na hora; o usuário chega por streaming
                    <Suspense fallback={<UserGreetingSkeleton />}>
                      <UserGreeting />
                    </Suspense>
                  }
                />
              }
            >
              {children}
            </AppShell>
            <FlashToaster />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
