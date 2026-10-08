import { describe, expect, it } from 'vitest';

import { getDisplayName } from './user';

describe('getDisplayName', () => {
  it('usa o nome quando existe', () => {
    expect(getDisplayName({ username: 'hanna', name: 'Hanna' })).toBe('Hanna');
  });

  it('cai no username sem nome', () => {
    expect(getDisplayName({ username: 'hanna' })).toBe('hanna');
    expect(getDisplayName({ username: 'hanna', name: '' })).toBe('hanna');
  });
});
