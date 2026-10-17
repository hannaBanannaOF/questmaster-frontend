import { Crown, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Tabs } from '@/src/design';

import type { DashboardTab } from '../../../domain';

const TABS = [
  { view: 'player', icon: Swords },
  { view: 'dm', icon: Crown },
] as const;

/** Troca entre jogador e mestre; só aparece para quem tem os dois papéis. */
export function DashboardTabs({ active }: { active: DashboardTab }) {
  const t = useTranslations('dashboard.tabs');

  return (
    <Tabs
      label={t('label')}
      items={TABS.map(({ view, icon: Icon }) => ({
        href: `/?view=${view}`,
        label: t(view),
        icon: <Icon aria-hidden />,
        current: view === active,
      }))}
    />
  );
}
