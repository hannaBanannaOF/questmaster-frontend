import { describe, expect, it } from 'vitest';

import {
  canDeleteCampaign,
  canInviteToCampaign,
  canManageCampaign,
} from './campaign';
import { CampaignStatus } from './campaign-status';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

describe('canManageCampaign', () => {
  it('só o DM gerencia', () => {
    expect(canManageCampaign({ isDm: true, status: ACTIVE })).toBe(true);
    expect(canManageCampaign({ isDm: false, status: ACTIVE })).toBe(false);
  });
});

describe('canDeleteCampaign', () => {
  it.each([
    [DRAFT, true],
    [ACTIVE, false],
    [PAUSED, false],
    [ARCHIVED, true],
  ])('DM em %s → %s', (status, expected) => {
    expect(canDeleteCampaign({ isDm: true, status })).toBe(expected);
  });

  it.each(Object.values(CampaignStatus))(
    'jogador nunca exclui (%s)',
    (status) => {
      expect(canDeleteCampaign({ isDm: false, status })).toBe(false);
    },
  );
});

describe('canInviteToCampaign', () => {
  it.each([
    [DRAFT, true],
    [ACTIVE, true],
    [PAUSED, true],
    [ARCHIVED, false],
  ])('DM em %s → %s', (status, expected) => {
    expect(canInviteToCampaign({ isDm: true, status })).toBe(expected);
  });

  it.each(Object.values(CampaignStatus))(
    'jogador nunca convida (%s)',
    (status) => {
      expect(canInviteToCampaign({ isDm: false, status })).toBe(false);
    },
  );
});
