import { describe, expect, it } from 'vitest';

import {
  hasPlayerRole,
  isDashboardTab,
  resolveDashboardTab,
} from './dashboard';

describe('isDashboardTab', () => {
  it('aceita só as abas existentes', () => {
    expect(isDashboardTab('player')).toBe(true);
    expect(isDashboardTab('dm')).toBe(true);
    expect(isDashboardTab('DM')).toBe(false);
    expect(isDashboardTab(undefined)).toBe(false);
  });
});

describe('hasPlayerRole', () => {
  it('joga quem tem ficha', () => {
    expect(hasPlayerRole(1, 0)).toBe(true);
  });

  it('joga quem está numa campanha de outro mestre', () => {
    expect(hasPlayerRole(0, 1)).toBe(true);
  });

  it('não joga sem ficha nem campanha', () => {
    expect(hasPlayerRole(0, 0)).toBe(false);
  });
});

describe('resolveDashboardTab', () => {
  const both = { hasPlayer: true, hasDm: true };
  const onlyDm = { hasPlayer: false, hasDm: true };
  const none = { hasPlayer: false, hasDm: false };

  it('a aba da URL vence, mesmo vazia', () => {
    expect(resolveDashboardTab('dm', none)).toBe('dm');
    expect(resolveDashboardTab('player', onlyDm)).toBe('player');
  });

  it('sem aba na URL, abre Jogando', () => {
    expect(resolveDashboardTab(undefined, both)).toBe('player');
    expect(resolveDashboardTab(undefined, none)).toBe('player');
  });

  it('sem aba na URL, abre Mestrando quando o usuário só mestra', () => {
    expect(resolveDashboardTab(undefined, onlyDm)).toBe('dm');
  });

  it('ignora valor inválido na URL', () => {
    expect(resolveDashboardTab('admin', onlyDm)).toBe('dm');
  });
});
