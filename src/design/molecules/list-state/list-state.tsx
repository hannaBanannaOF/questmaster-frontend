import type { ReactNode } from 'react';

import { Surface } from '../../atoms/surface/surface';
import styles from './list-state.module.css';

interface ListStateProps {
  id: string;
  icon: ReactNode;
  title: string;
  message: string;
  actions?: ReactNode;
  /** Anuncia a troca (ex.: a busca acabou sem resultado). */
  live?: boolean;
  /** 1 quando o estado é a página inteira (ex.: não encontrada). */
  headingLevel?: 1 | 2;
}

/** Lista sem o que mostrar (vazia, sem resultado, página inexistente). */
export function ListState({
  id,
  icon,
  title,
  message,
  actions,
  live,
  headingLevel = 2,
}: ListStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Surface
      as="section"
      className={styles.state}
      aria-labelledby={id}
      aria-live={live ? 'polite' : undefined}
    >
      <span className={styles.icon} aria-hidden>
        {icon}
      </span>
      <Heading id={id}>{title}</Heading>
      <p className={styles.message}>{message}</p>
      {actions && <div className={styles.actions}>{actions}</div>}
    </Surface>
  );
}
