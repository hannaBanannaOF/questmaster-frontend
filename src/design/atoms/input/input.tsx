import type { ComponentProps } from 'react';

import { cx } from '../../utils';
import styles from './control.module.css';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cx(styles.control, className)} {...props} />;
}
