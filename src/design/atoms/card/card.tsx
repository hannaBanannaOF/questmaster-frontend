import type { HTMLAttributes } from 'react';

import { cx } from '../../utils';
import styles from './card.module.css';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'label';
  /** Realça a borda no hover/foco (cards clicáveis). */
  interactive?: boolean;
  /** Borda superior em destaque, para o card principal da página. */
  hero?: boolean;
  compact?: boolean;
}

export function Card({
  as: Tag = 'div',
  interactive,
  hero,
  compact,
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cx(styles.card, className)}
      data-interactive={interactive || undefined}
      data-hero={hero || undefined}
      data-compact={compact || undefined}
      {...props}
    />
  );
}
