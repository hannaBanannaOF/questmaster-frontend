import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cx } from '../../utils';
import styles from './text-link.module.css';

/** Link do HeroUI v3 com seta: "Ver todos" (adiante) ou voltar (`back`). */
export function TextLink({
  back,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { back?: boolean }) {
  return (
    <Link className={cx(styles.link, className)} {...props}>
      {back && <ChevronLeft aria-hidden />}
      {children}
      {!back && <ChevronRight aria-hidden />}
    </Link>
  );
}
