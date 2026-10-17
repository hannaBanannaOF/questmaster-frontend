import type { ReactNode } from 'react';

import styles from './alert.module.css';

interface AlertProps {
  title: string;
  description?: string;
  icon: ReactNode;
  tone?: 'accent' | 'danger';
  /** Ação ao lado do texto (desce para a largura toda no celular). */
  action?: ReactNode;
}

/** Alert do HeroUI v3; `danger` é anunciado como alerta. */
export function Alert({
  title,
  description,
  icon,
  tone = 'accent',
  action,
}: AlertProps) {
  return (
    <div
      className={styles.alert}
      data-tone={tone}
      role={tone === 'danger' ? 'alert' : undefined}
    >
      <span className={styles.indicator} aria-hidden>
        {icon}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
