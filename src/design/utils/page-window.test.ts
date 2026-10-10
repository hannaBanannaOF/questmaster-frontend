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

  it('sem reticências quando o buraco seria de uma página só', () => {
    expect(getPageWindow(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('nas pontas', () => {
    expect(getPageWindow(1, 20)).toEqual([1, 2, 'gap', 20]);
    expect(getPageWindow(20, 20)).toEqual([1, 'gap', 19, 20]);
  });
});
