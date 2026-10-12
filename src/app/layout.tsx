import '@/src/design/foundations/global.css';

import { LayoutDashboard, ScrollText, Users } from 'lucide-react';
import type { Metadata, Viewport } from 'next';
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

// cover: a barra inferior usa env(safe-area-inset-bottom) no iPhone
export const viewport: Viewport = { viewportFit: 'cover' };

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('common.header'),
  ]);

  const navItems = [
    {
      href: '/',
      label: t('dashboard'),
      icon: <LayoutDashboard size={22} />,
      exact: true,
    },
    {
      href: '/campaigns',
      label: t('campaigns'),
      icon: <ScrollText size={22} />,
    },
    { href: '/characters', label: t('characters'), icon: <Users size={22} /> },
  ];

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
                  nav={<Nav label={t('navLabel')} items={navItems} />}
                  actions={
                    // O header renderiza na hora; o usuário chega por streaming
                    <Suspense fallback={<UserGreetingSkeleton />}>
                      <UserGreeting />
                    </Suspense>
                  }
                />
              }
              bottomNav={
                <Nav label={t('navLabel')} items={navItems} variant="bottom" />
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
