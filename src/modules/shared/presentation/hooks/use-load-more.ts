'use client';

import { useState, useTransition } from 'react';

import type { ActionResult } from '@/src/lib/actions';

/**
 * "Mostrar mais": começa na página da URL e acrescenta as seguintes no fim.
 * Falha não perde o que já carregou; tentar de novo pede a mesma página.
 */
export function useLoadMore<T>(
  initialItems: T[],
  page: number,
  loadPage: (page: number) => Promise<ActionResult<T[]>>,
) {
  const [items, setItems] = useState(initialItems);
  const [lastPage, setLastPage] = useState(page);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  const loadMore = () =>
    startTransition(async () => {
      const next = lastPage + 1;
      const result = await loadPage(next);
      setFailed(!result.ok);
      if (!result.ok) return;
      setItems((current) => [...current, ...result.data]);
      setLastPage(next);
    });

  return { items, pending, failed, loadMore };
}
