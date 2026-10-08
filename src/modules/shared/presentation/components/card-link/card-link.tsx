import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { Card, Stack } from '@/src/design';

import styles from './card-link.module.css';

interface CardLinkProps extends PropsWithChildren {
  href: string;
}

/** Card inteiro clicável que leva ao detalhe do item, com a seta à direita. */
export function CardLink({ href, children }: CardLinkProps) {
  return (
    <Link href={href} className={styles.cardLink}>
      <Card interactive>
        <Stack align="center" justify="space-between">
          {children}
          <span className={styles.chevron} aria-hidden>
            <ChevronRight />
          </span>
        </Stack>
      </Card>
    </Link>
  );
}
