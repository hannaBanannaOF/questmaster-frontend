import type { ComponentProps } from 'react';

import { cx } from '../../utils';
import styles from './label.module.css';

interface LabelProps extends ComponentProps<'label'> {
  required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cx(styles.label, className)} {...props}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden>
          {' *'}
        </span>
      )}
    </label>
  );
}
