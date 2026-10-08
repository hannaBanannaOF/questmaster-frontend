import { describe, expect, it } from 'vitest';

import {
  CampaignStatus,
  canTransition,
  getAvailableTransitions,
  isCampaignStatus,
} from './campaign-status';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

describe('getAvailableTransitions', () => {
  it.each([
    [DRAFT, [ACTIVE]],
    [ACTIVE, [PAUSED, ARCHIVED]],
    [PAUSED, [ACTIVE, ARCHIVED]],
    [ARCHIVED, []],
  ])('%s → %j', (status, expected) => {
    expect(getAvailableTransitions(status)).toEqual(expected);
  });

  it('não devolve transições para um status desconhecido', () => {
    expect(getAvailableTransitions('UNKNOWN' as CampaignStatus)).toEqual([]);
  });
});

describe('canTransition', () => {
  const allowed = [
    [DRAFT, ACTIVE],
    [ACTIVE, PAUSED],
    [ACTIVE, ARCHIVED],
    [PAUSED, ACTIVE],
    [PAUSED, ARCHIVED],
  ] as const;

  it.each(allowed)('permite %s → %s', (from, to) => {
    expect(canTransition(from, to)).toBe(true);
  });

  const all = Object.values(CampaignStatus);
  const forbidden = all
    .flatMap((from) => all.map((to) => [from, to] as const))
    .filter(([from, to]) => !allowed.some(([f, t]) => f === from && t === to));

  it.each(forbidden)('bloqueia %s → %s', (from, to) => {
    expect(canTransition(from, to)).toBe(false);
  });
});

describe('isCampaignStatus', () => {
  it('reconhece os status do domínio', () => {
    expect(Object.values(CampaignStatus).every(isCampaignStatus)).toBe(true);
  });

  it.each(['draft', 'FINISHED', '', null, undefined, 1])(
    'rejeita %j',
    (value) => {
      expect(isCampaignStatus(value)).toBe(false);
    },
  );
});
