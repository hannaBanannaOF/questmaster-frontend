import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import styles from './breadcrumb.module.css';

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
  /** Nome acessível da navegação (já traduzido). */
  label: string;
}

export function Breadcrumb({ segments, label }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className={styles.list}>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          return (
            <li key={`${segment.label}-${index}`} className={styles.item}>
              {isLast || !segment.href ? (
                <span aria-current={isLast ? 'page' : undefined}>
                  {segment.label}
                </span>
              ) : (
                <Link href={segment.href} className={styles.link}>
                  {segment.label}
                </Link>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden>
                  <ChevronRight size={14} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
