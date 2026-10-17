export type PageWindowItem = number | 'gap';

const MAX_WITHOUT_GAPS = 7;

/**
 * Páginas exibidas no paginador: até 7, todas; acima disso, a primeira, a
 * última e as vizinhas da atual, e o resto vira reticências (1 … 5 6 7 … 1502).
 */
export function getPageWindow(
  page: number,
  pageCount: number,
): PageWindowItem[] {
  if (pageCount <= MAX_WITHOUT_GAPS) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const shown = [1, page - 1, page, page + 1, pageCount]
    .filter((n) => n >= 1 && n <= pageCount)
    .filter((n, i, all) => all.indexOf(n) === i)
    .sort((a, b) => a - b);

  const items: PageWindowItem[] = [];
  let previous = 0;
  for (const n of shown) {
    if (n - previous > 1) items.push('gap');
    items.push(n);
    previous = n;
  }
  return items;
}
