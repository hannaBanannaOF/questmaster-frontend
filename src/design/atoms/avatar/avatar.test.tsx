import { describe, expect, it } from 'vitest';

import { getInitials } from './avatar';

describe('getInitials', () => {
  it('usa as duas primeiras palavras', () => {
    expect(getInitials('Eleanor Vance')).toBe('EV');
    expect(getInitials('  arthur  gordon pym ')).toBe('AG');
  });

  it('nome de uma palavra vira uma letra', () => {
    expect(getInitials('Jack')).toBe('J');
  });
});
