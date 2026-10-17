import { describe, expect, it } from 'vitest';

import { safeReturnTo } from './return-to';

describe('safeReturnTo', () => {
  it('aceita o caminho de um convite', () => {
    const path = '/join/9cd949d1-1669-4710-9a4e-f49bd725a161';
    expect(safeReturnTo(path)).toBe(path);
  });

  it.each([
    'https://evil.example/join/9cd949d1-1669-4710-9a4e-f49bd725a161',
    '//evil.example',
    '/join/nope',
    '/characters',
    undefined,
  ])('ignora %j', (value) => {
    expect(safeReturnTo(value)).toBeUndefined();
  });
});
