import type { ComponentProps } from 'react';

import { cx } from '../../utils';
import controlStyles from '../input/control.module.css';
import styles from './textarea.module.css';

export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cx(controlStyles.control, styles.textarea, className)}
      {...props}
    />
  );
}
