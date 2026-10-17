import type { PropsWithChildren } from 'react';

import styles from './chip.module.css';

export type ChipTone =
  'default' | 'success' | 'warning' | 'archived' | 'accent';

interface ChipProps extends PropsWithChildren {
  tone?: ChipTone;
  /** Bolinha de status: separa status de outros chips pela forma, não só pela cor. */
  dot?: boolean;
}

/** Chip soft do HeroUI v3. */
export function Chip({ tone = 'default', dot, children }: ChipProps) {
  return (
    <span className={styles.chip} data-tone={tone}>
      {dot && <span className={styles.dot} aria-hidden />}
      {children}
    </span>
  );
}
