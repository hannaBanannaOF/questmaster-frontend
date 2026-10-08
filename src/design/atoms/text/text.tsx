import type { ComponentProps } from 'react';

import { cx } from '../../utils';
import styles from './text.module.css';

export type TextTone = 'default' | 'muted' | 'danger';

interface TextProps extends ComponentProps<'p'> {
  as?: 'p' | 'span';
  tone?: TextTone;
  bold?: boolean;
  small?: boolean;
  uppercase?: boolean;
}

export function Text({
  as: Tag = 'p',
  tone = 'default',
  bold,
  small,
  uppercase,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cx(styles.text, className)}
      data-tone={tone}
      data-weight={bold ? 'bold' : undefined}
      data-size={small ? 'sm' : undefined}
      data-uppercase={uppercase || undefined}
      {...props}
    />
  );
}
