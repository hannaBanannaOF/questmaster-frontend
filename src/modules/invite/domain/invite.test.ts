import { describe, expect, it } from 'vitest';

import { getInvitePath, isInviteHash } from './invite';

describe('getInvitePath', () => {
  it('monta o caminho público do convite', () => {
    expect(getInvitePath('abc123')).toBe('/join/abc123');
  });
});

describe('isInviteHash', () => {
  it.each([
    '9cd949d1-1669-4710-9a4e-f49bd725a161',
    '9CD949D1-1669-4710-9A4E-F49BD725A161',
  ])('aceita o UUID %s', (hash) => {
    expect(isInviteHash(hash)).toBe(true);
  });

  it.each([
    'hash-inventado',
    '',
    '9cd949d1-1669-4710-9a4e-f49bd725a16',
    '9cd949d1-1669-4710-9a4e-f49bd725a161x',
    ' 9cd949d1-1669-4710-9a4e-f49bd725a161',
  ])('rejeita %j', (hash) => {
    expect(isInviteHash(hash)).toBe(false);
  });
});
