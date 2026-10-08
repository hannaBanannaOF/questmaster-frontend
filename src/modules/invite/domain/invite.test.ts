import { describe, expect, it } from 'vitest';

import { getInvitePath } from './invite';

describe('getInvitePath', () => {
  it('monta o caminho público do convite', () => {
    expect(getInvitePath('abc123')).toBe('/join/abc123');
  });
});
