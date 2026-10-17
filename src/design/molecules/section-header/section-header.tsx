import type { ReactNode } from 'react';

import styles from './section-header.module.css';

interface SectionHeaderProps {
  id: string;
  title: string;
  /** Total ao lado do título; omitido quando a seção não carregou. */
  count?: number;
  /** Nome acessível do total, ex.: "3 no total". */
  countLabel?: string;
  actions?: ReactNode;
}

/** Título de seção com contador e ações à direita; `id` liga ao aria-labelledby da seção. */
export function SectionHeader({
  id,
  title,
  count,
  countLabel,
  actions,
}: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2 id={id}>{title}</h2>
        {count !== undefined && (
          <span className={styles.count} aria-label={countLabel}>
            {count}
          </span>
        )}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
