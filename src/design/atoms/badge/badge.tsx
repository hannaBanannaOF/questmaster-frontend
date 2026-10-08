import type { PropsWithChildren } from 'react';

import styles from './badge.module.css';

export type BadgeTone = 'info' | 'success' | 'warning' | 'neutral';

interface BadgeProps extends PropsWithChildren {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return (
    <span className={styles.badge} data-tone={tone}>
      {children}
    </span>
  );
}
