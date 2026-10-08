import type { PropsWithChildren, ReactNode } from 'react';

import styles from './icon-text.module.css';

export type IconTextTone = 'default' | 'muted' | 'primary' | 'danger';

interface IconTextProps extends PropsWithChildren {
  icon: ReactNode;
  tone?: IconTextTone;
}

/** Ícone + texto curto alinhados (contadores, selos, metadados). */
export function IconText({ icon, tone = 'default', children }: IconTextProps) {
  return (
    <span className={styles.iconText} data-tone={tone}>
      {icon}
      {children}
    </span>
  );
}
