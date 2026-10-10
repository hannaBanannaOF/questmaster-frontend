import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './segmented-nav.module.css';

export interface SegmentedNavItem {
  href: string;
  label: string;
  icon?: ReactNode;
  current?: boolean;
}

interface SegmentedNavProps {
  /** Nome acessível do grupo (já traduzido). */
  label: string;
  items: SegmentedNavItem[];
}

/** Opções exclusivas como links (abas, filtros): o estado fica na URL. */
export function SegmentedNav({ label, items }: SegmentedNavProps) {
  return (
    <nav aria-label={label}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.item}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
