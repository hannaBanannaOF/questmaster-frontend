import Link from 'next/link';

import type { SegmentedNavItem } from '../segmented-nav/segmented-nav';
import styles from './tabs.module.css';

interface TabsProps {
  /** Nome acessível do grupo (já traduzido). */
  label: string;
  items: SegmentedNavItem[];
}

/**
 * Visual do Tabs "primary" do HeroUI v3, mas como links: a aba fica na URL
 * e a página continua sendo renderizada no servidor.
 */
export function Tabs({ label, items }: TabsProps) {
  return (
    <nav aria-label={label} className={styles.tabs}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href} className={styles.item}>
            <Link
              href={item.href}
              className={styles.tab}
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
