import { useTranslations } from 'next-intl';
import { type ReactNode, useId } from 'react';

import { Surface } from '@/src/design';

import { RetryButton } from '../retry-button/retry-button';
import styles from './critical-failure.module.css';

interface CriticalFailureProps {
  title: string;
  message: string;
  /** Saída alternativa ao lado de "Tentar de novo". */
  secondaryAction: ReactNode;
  hint?: string;
  /** 1 quando a falha é a página inteira (o error.tsx). */
  headingLevel?: 1 | 2;
  /** Roda junto com o refresh do "Tentar de novo". */
  onRetry?: () => void;
}

/** "Falha crítica": o d20 tirou 1. Para quando não há o que mostrar no lugar. */
export function CriticalFailure({
  title,
  message,
  secondaryAction,
  hint,
  headingLevel = 2,
  onRetry,
}: CriticalFailureProps) {
  const t = useTranslations('common');
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <Surface
      as="section"
      role="alert"
      className={styles.failure}
      aria-labelledby={id}
    >
      <span className={styles.crit} aria-hidden>
        <D20ShowingOne />
      </span>
      <span className={styles.critTag}>{t('failure.tag')}</span>
      <Heading id={id}>{title}</Heading>
      <p className={styles.muted}>{message}</p>
      <div className={styles.failureActions}>
        <RetryButton
          label={t('actions.retry')}
          variant="primary"
          onRetry={onRetry}
        />
        {secondaryAction}
      </div>
      {hint && <p className={styles.muted}>{hint}</p>}
    </Surface>
  );
}

function D20ShowingOne() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M12 2 21 7v10l-9 5-9-5V7z" />
      <path d="M12 6.5 6.8 15.5h10.4z" />
      <text
        x="12"
        y="13.9"
        textAnchor="middle"
        fontSize="5.6"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-heading)"
      >
        1
      </text>
    </svg>
  );
}
