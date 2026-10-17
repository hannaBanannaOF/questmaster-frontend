import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLoadMore } from './use-load-more';

describe('useLoadMore', () => {
  it('acrescenta a página seguinte no fim', async () => {
    const loadPage = vi.fn(async (page: number) => ({
      ok: true as const,
      data: [`item-${page}`],
    }));
    const { result } = renderHook(() => useLoadMore(['item-1'], 1, loadPage));

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(2));
    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(3));

    expect(loadPage.mock.calls.map(([page]) => page)).toEqual([2, 3]);
    expect(result.current.items).toEqual(['item-1', 'item-2', 'item-3']);
  });

  it('falha mantém o que já carregou e repete a mesma página', async () => {
    const loadPage = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true, data: ['item-2'] });
    const { result } = renderHook(() => useLoadMore(['item-1'], 1, loadPage));

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current.items).toEqual(['item-1']);

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(2));
    expect(result.current.failed).toBe(false);
    expect(loadPage.mock.calls.map(([page]) => page)).toEqual([2, 2]);
  });
});
