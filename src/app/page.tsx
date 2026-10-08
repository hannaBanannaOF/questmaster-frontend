import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DashboardView } from '@/src/modules/dashboard';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('dashboard');
  return { title: t('title') };
}

interface HomePageProps {
  searchParams: Promise<{ view?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { view } = await searchParams;
  return <DashboardView view={typeof view === 'string' ? view : undefined} />;
}
