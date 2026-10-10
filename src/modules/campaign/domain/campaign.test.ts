import { describe, expect, it } from 'vitest';

import {
  canDeleteCampaign,
  canInviteToCampaign,
  canManageCampaign,
  isCampaignRole,
  orderStatusCounts,
  totalCampaigns,
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

describe('isCampaignRole', () => {
  it('aceita só dm e player', () => {
    expect(isCampaignRole('dm')).toBe(true);
    expect(isCampaignRole('player')).toBe(true);
    expect(isCampaignRole('DM')).toBe(false);
    expect(isCampaignRole(undefined)).toBe(false);
  });
});

describe('contagem por status', () => {
  const counts = { [DRAFT]: 0, [ACTIVE]: 2, [PAUSED]: 1, [ARCHIVED]: 4 };

  it('ordena por Jogando, Rascunho, Pausada e Arquivada, incluindo os zerados', () => {
    expect(orderStatusCounts(counts)).toEqual([
      { status: ACTIVE, count: 2 },
      { status: DRAFT, count: 0 },
      { status: PAUSED, count: 1 },
      { status: ARCHIVED, count: 4 },
    ]);
  });

  it('soma todos os status', () => {
    expect(totalCampaigns(counts)).toBe(7);
  });
});
