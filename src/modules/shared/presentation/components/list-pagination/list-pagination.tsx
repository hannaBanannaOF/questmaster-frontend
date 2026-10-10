import { useFormatter, useTranslations } from 'next-intl';

import { Pagination } from '@/src/design';
import { countPages, PAGE_SIZE, pageRange } from '@/src/lib/pagination';

import { ResourceNotFound } from '../resource-not-found/resource-not-found';

interface ListPaginationProps {
  page: number;
  total: number;
  hrefFor: (page: number) => string;
  /** Texto do resumo a partir da faixa exibida ("Mostrando 21–30 de 47 campanhas"). */
  summary: (range: { from: number; to: number; total: number }) => string;
}

/** Paginador das listas, já traduzido; some quando tudo cabe numa página. */
export function ListPagination({
  page,
  total,
  hrefFor,
  summary,
}: ListPaginationProps) {
  const t = useTranslations('common.pagination');
  const format = useFormatter();

  return (
    <Pagination
      page={page}
      pageCount={countPages(total, PAGE_SIZE)}
      hrefFor={hrefFor}
      summary={summary({ ...pageRange(page, total, PAGE_SIZE), total })}
      formatNumber={(value) => format.number(value)}
      labels={{
        nav: t('label'),
        previous: t('previous'),
        next: t('next'),
        page: (n) => t('page', { page: n }),
      }}
    />
  );
}

interface PageOutOfRangeProps {
  pageCount: number;
  firstPageHref: string;
}

/** Link para uma página além do fim (a lista diminuiu, ou o número foi digitado). */
export function PageOutOfRange({
  pageCount,
  firstPageHref,
}: PageOutOfRangeProps) {
  const t = useTranslations('common.pagination.outOfRange');

  return (
    <ResourceNotFound
      title={t('title')}
      message={t('message', { count: pageCount })}
      backHref={firstPageHref}
      backLabel={t('action')}
    />
  );
}
