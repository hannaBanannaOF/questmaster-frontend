import type { PropsWithChildren } from 'react';

import { cx } from '../../utils';
import styles from './stack.module.css';

export type StackDirection = 'row' | 'column';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify =
  'start' | 'center' | 'end' | 'space-between' | 'space-around';
export type StackGap = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

interface StackProps extends PropsWithChildren {
  as?: 'div' | 'section' | 'header' | 'footer' | 'ul' | 'ol';
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: boolean;
  className?: string;
}

/** Primitivo de layout flex: todo espaçamento entre elementos passa por aqui. */
export function Stack({
  as: Tag = 'div',
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap,
  className,
  children,
}: StackProps) {
  return (
    <Tag
      className={cx(styles.stack, className)}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      data-gap={gap}
      data-wrap={wrap || undefined}
    >
      {children}
    </Tag>
  );
}
