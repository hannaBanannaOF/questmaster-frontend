import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Text } from '../../atoms/text/text';
import { getPageWindow } from '../../utils';
import styles from './pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  /** Link de cada página, mantendo os filtros da lista. */
  hrefFor: (page: number) => string;
  /** Resumo ao lado, ex.: "Mostrando 21–30 de 47 campanhas". */
  summary?: ReactNode;
  labels: {
    nav: string;
    previous: string;
    next: string;
    page: (page: number) => string;
  };
  /** Formata o número exibido (ex.: 1.502); por padrão, sem separador. */
  formatNumber?: (value: number) => string;
}

/** Paginador com links: funciona sem JS e cada página tem sua URL. */
export function Pagination({
  page,
  pageCount,
  hrefFor,
  summary,
  labels,
  formatNumber = String,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const edge = (target: number, disabled: boolean, content: ReactNode) =>
    disabled ? (
      <span className={styles.item} aria-disabled="true">
        {content}
      </span>
    ) : (
      <Link className={styles.item} href={hrefFor(target)}>
        {content}
      </Link>
    );

  return (
    <nav className={styles.pagination} aria-label={labels.nav}>
      {summary && (
        <Text tone="muted" small>
          {summary}
        </Text>
      )}
      <ul className={styles.pages}>
        <li>
          {edge(
            page - 1,
            page <= 1,
            <>
              <ChevronLeft size={16} aria-hidden />
              {labels.previous}
            </>,
          )}
        </li>
        {getPageWindow(page, pageCount).map((item, index) => (
          <li key={item === 'gap' ? `gap-${index}` : item}>
            {item === 'gap' ? (
              <span className={styles.gap} aria-hidden>
                …
              </span>
            ) : (
              <Link
                className={styles.item}
                href={hrefFor(item)}
                aria-label={labels.page(item)}
                aria-current={item === page ? 'page' : undefined}
              >
                {formatNumber(item)}
              </Link>
            )}
          </li>
        ))}
        <li>
          {edge(
            page + 1,
            page >= pageCount,
            <>
              {labels.next}
              <ChevronRight size={16} aria-hidden />
            </>,
          )}
        </li>
      </ul>
    </nav>
  );
}
