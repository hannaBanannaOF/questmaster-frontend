import { Crown, Swords } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { DashboardTab } from '../../../domain';
import styles from './dashboard-tabs.module.css';

const TABS = [
  { view: 'player', icon: Swords },
  { view: 'dm', icon: Crown },
] as const;

/** Troca entre jogador e mestre; as duas abas aparecem sempre, mesmo vazias. */
export function DashboardTabs({ active }: { active: DashboardTab }) {
  const t = useTranslations('dashboard.tabs');

  return (
    <nav aria-label={t('label')}>
      <ul className={styles.tabs}>
        {TABS.map(({ view, icon: Icon }) => (
          <li key={view}>
            <Link
              href={`/?view=${view}`}
              className={styles.tab}
              aria-current={view === active ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden />
              {t(view)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
