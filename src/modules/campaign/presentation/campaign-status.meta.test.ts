import { describe, expect, it } from 'vitest';

import { CampaignStatus, getAvailableTransitions } from '../domain';
import {
  getCampaignStatusMeta,
  getTransitionLabelKey,
} from './campaign-status.meta';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

describe('getTransitionLabelKey', () => {
  it.each([
    [DRAFT, ACTIVE, 'actions.start'],
    [ACTIVE, PAUSED, 'actions.pause'],
    [ACTIVE, ARCHIVED, 'actions.end'],
    [PAUSED, ACTIVE, 'actions.resume'],
    [PAUSED, ARCHIVED, 'actions.archive'],
  ])('%s → %s usa "%s"', (from, to, expected) => {
    expect(getTransitionLabelKey(from, to)).toBe(expected);
  });

  it('toda transição permitida tem rótulo', () => {
    for (const from of Object.values(CampaignStatus)) {
      for (const to of getAvailableTransitions(from)) {
        expect(getTransitionLabelKey(from, to)).toMatch(/^actions\./);
      }
    }
  });
});

describe('getCampaignStatusMeta', () => {
  it('cai em Rascunho para status desconhecido', () => {
    expect(getCampaignStatusMeta('UNKNOWN' as CampaignStatus)).toEqual(
      getCampaignStatusMeta(DRAFT),
    );
  });
});
