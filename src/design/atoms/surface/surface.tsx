import Link from 'next/link';
import type { ComponentProps, HTMLAttributes } from 'react';

import { cx } from '../../utils';
import styles from './surface.module.css';

type SurfaceVariant = 'default' | 'secondary';

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'aside';
  variant?: SurfaceVariant;
}

/** Card do HeroUI v3: superfície com raio grande e sombra sutil. */
export function Surface({
  as: Tag = 'div',
  variant = 'default',
  className,
  ...props
}: SurfaceProps) {
  return (
    <Tag
      className={cx(styles.surface, className)}
      data-variant={variant}
      {...props}
    />
  );
}

type SurfaceLinkProps = ComponentProps<typeof Link> & {
  variant?: SurfaceVariant;
};

/** Card inteiro clicável (o link é o próprio card, sem botões dentro). */
export function SurfaceLink({
  variant = 'default',
  className,
  ...props
}: SurfaceLinkProps) {
  return (
    <Link
      className={cx(styles.surface, styles.link, className)}
      data-variant={variant}
      {...props}
    />
  );
}
