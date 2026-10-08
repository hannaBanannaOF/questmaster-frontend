import { describe, expect, it } from 'vitest';

import {
  canEditCharacter,
  clampHp,
  DEFAULT_MAX_HP,
  getMaxHp,
  isValidHp,
} from './character';

describe('getMaxHp', () => {
  it('usa o PV máximo da ficha', () => {
    expect(getMaxHp({ maxHp: 12 })).toBe(12);
  });

  it('assume 100 quando a ficha não define', () => {
    expect(getMaxHp({})).toBe(DEFAULT_MAX_HP);
    expect(DEFAULT_MAX_HP).toBe(100);
  });

  it('respeita PV máximo 0', () => {
    expect(getMaxHp({ maxHp: 0 })).toBe(0);
  });
});

describe('isValidHp', () => {
  it.each([0, 1, 12])('aceita %d sem teto', (hp) => {
    expect(isValidHp(hp)).toBe(true);
  });

  it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejeita %d',
    (hp) => {
      expect(isValidHp(hp)).toBe(false);
    },
  );

  it('respeita o teto quando informado', () => {
    expect(isValidHp(12, 12)).toBe(true);
    expect(isValidHp(13, 12)).toBe(false);
  });
});

describe('clampHp', () => {
  it.each([
    [-3, 0],
    [0, 0],
    [7, 7],
    [12, 12],
    [20, 12],
  ])('%d com máximo 12 → %d', (hp, expected) => {
    expect(clampHp(hp, 12)).toBe(expected);
  });
});

describe('canEditCharacter', () => {
  it('só o dono edita', () => {
    expect(canEditCharacter({ isPlayer: true })).toBe(true);
    expect(canEditCharacter({ isPlayer: false })).toBe(false);
  });
});
