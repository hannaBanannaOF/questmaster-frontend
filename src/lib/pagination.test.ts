import { describe, expect, it } from 'vitest';

import {
  countPages,
  mapPage,
  PAGE_SIZE,
  pageRange,
  parsePageNumber,
  toPageRequest,
} from './pagination';

describe('parsePageNumber', () => {
  it.each([
    ['1', 1],
    ['3', 3],
    ['120', 120],
  ])('lê %j como %d', (raw, page) => {
    expect(parsePageNumber(raw)).toBe(page);
  });

  it.each([undefined, '', '0', '-2', '1.5', 'abc', '2abc', ['2']])(
    'cai na página 1 com %j',
    (raw) => {
      expect(parsePageNumber(raw)).toBe(1);
    },
  );
});

describe('toPageRequest', () => {
  it('usa 10 por página', () => {
    expect(PAGE_SIZE).toBe(10);
    expect(toPageRequest(1)).toEqual({ limit: 10, offset: 0 });
    expect(toPageRequest(3)).toEqual({ limit: 10, offset: 20 });
  });

  it('aceita outro tamanho (prévias)', () => {
    expect(toPageRequest(2, 5)).toEqual({ limit: 5, offset: 5 });
  });
});

describe('countPages', () => {
  it.each([
    [0, 1],
    [1, 1],
    [10, 1],
    [11, 2],
    [47, 5],
    [15017, 1502],
  ])('%d itens viram %d páginas', (total, pages) => {
    expect(countPages(total)).toBe(pages);
  });
});

describe('pageRange', () => {
  it('mostra a faixa da página', () => {
    expect(pageRange(3, 47)).toEqual({ from: 21, to: 30 });
  });

  it('a última página termina no total', () => {
    expect(pageRange(5, 47)).toEqual({ from: 41, to: 47 });
  });
});

describe('mapPage', () => {
  it('converte os itens e mantém o total', () => {
    expect(mapPage({ items: [1, 2], total: 9 }, (n) => n * 10)).toEqual({
      items: [10, 20],
      total: 9,
    });
  });
});
