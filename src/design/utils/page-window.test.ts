import { describe, expect, it } from 'vitest';

import { getPageWindow } from './page-window';

describe('getPageWindow', () => {
  it('mostra todas quando são poucas', () => {
    expect(getPageWindow(1, 3)).toEqual([1, 2, 3]);
    expect(getPageWindow(2, 2)).toEqual([1, 2]);
  });

  it('página única', () => {
    expect(getPageWindow(1, 1)).toEqual([1]);
  });

  it('reticências entre a primeira, as vizinhas e a última', () => {
    expect(getPageWindow(6, 1502)).toEqual([1, 'gap', 5, 6, 7, 'gap', 1502]);
  });

  it('até 7 páginas, todas aparecem', () => {
    expect(getPageWindow(1, 4)).toEqual([1, 2, 3, 4]);
    expect(getPageWindow(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('acima de 7, reticências dos dois lados da atual', () => {
    expect(getPageWindow(5, 12)).toEqual([1, 'gap', 4, 5, 6, 'gap', 12]);
  });

  it('nas pontas', () => {
    expect(getPageWindow(1, 20)).toEqual([1, 2, 'gap', 20]);
    expect(getPageWindow(20, 20)).toEqual([1, 'gap', 19, 20]);
  });
});
