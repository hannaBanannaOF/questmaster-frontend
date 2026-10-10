import { Crown, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SegmentedNav } from '@/src/design';

import type { DashboardTab } from '../../../domain';

const TABS = [
  { view: 'player', icon: Swords },
  { view: 'dm', icon: Crown },
] as const;

/** Troca entre jogador e mestre; as duas abas aparecem sempre, mesmo vazias. */
export function DashboardTabs({ active }: { active: DashboardTab }) {
  const t = useTranslations('dashboard.tabs');

  return (
    <SegmentedNav
      label={t('label')}
      items={TABS.map(({ view, icon: Icon }) => ({
        href: `/?view=${view}`,
        label: t(view),
        icon: <Icon size={18} aria-hidden />,
        current: view === active,
      }))}
    />
  );
}
