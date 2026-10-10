// Shared kernel: paginação por offset das listas do core ({ items, total })

/** Itens por página nas listas do app. */
export const PAGE_SIZE = 10;

export interface PageRequest {
  limit: number;
  offset: number;
}

/** Uma página de itens e o total que bate com os filtros, ignorando a paginação. */
export interface Page<T> {
  items: T[];
  total: number;
}

/** Número da página vindo da URL; qualquer coisa que não seja inteiro ≥ 1 vira 1. */
export function parsePageNumber(raw: unknown): number {
  if (typeof raw !== 'string' || !/^\d+$/.test(raw)) return 1;
  const page = Number(raw);
  return page >= 1 ? page : 1;
}

export function toPageRequest(page: number, size = PAGE_SIZE): PageRequest {
  return { limit: size, offset: (page - 1) * size };
}

/** Quantas páginas a lista tem; lista vazia ainda tem uma (a do estado vazio). */
export function countPages(total: number, size = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / size));
}

/** Posição dos itens exibidos ("21–30 de 47"). */
export function pageRange(page: number, total: number, size = PAGE_SIZE) {
  return {
    from: Math.min((page - 1) * size + 1, total),
    to: Math.min(page * size, total),
  };
}

export function mapPage<T, U>(page: Page<T>, map: (item: T) => U): Page<U> {
  return { items: page.items.map(map), total: page.total };
}
