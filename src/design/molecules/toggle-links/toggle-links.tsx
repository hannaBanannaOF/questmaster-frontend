import Link from 'next/link';

import type { ChipTone } from '../../atoms/chip/chip';
import styles from './toggle-links.module.css';

export interface ToggleLinkItem {
  href: string;
  label: string;
  current?: boolean;
  /** Bolinha na cor do status, como no Chip. */
  dot?: ChipTone;
}

interface ToggleLinksProps {
  /** Nome acessível do grupo (já traduzido). */
  label: string;
  items: ToggleLinkItem[];
}

/** ToggleButtonGroup do HeroUI como links: filtro de um toque, estado na URL. */
export function ToggleLinks({ label, items }: ToggleLinksProps) {
  return (
    <nav aria-label={label} className={styles.group}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.toggle}
              aria-current={item.current ? 'true' : undefined}
            >
              {item.dot && (
                <span className={styles.dot} data-tone={item.dot} aria-hidden />
              )}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
