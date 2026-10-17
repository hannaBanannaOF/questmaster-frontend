import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '@/src/modules/campaign/domain';

import { canEditCharacter } from './character';

const campaign = (isDm: boolean) => ({
  id: 1,
  slug: 'innsmouth',
  name: 'Innsmouth',
  status: CampaignStatus.ACTIVE,
  isDm,
});

describe('canEditCharacter', () => {
  it('a dona edita a própria ficha', () => {
    expect(canEditCharacter({ isPlayer: true })).toBe(true);
    expect(canEditCharacter({ isPlayer: false })).toBe(false);
  });

  it('o mestre edita a ficha pronta da campanha dele', () => {
    expect(
      canEditCharacter({
        isPlayer: false,
        isPremade: true,
        campaign: campaign(true),
      }),
    ).toBe(true);
  });

  it('o mestre não edita a ficha de um jogador nem a pronta de outra mesa', () => {
    expect(
      canEditCharacter({
        isPlayer: false,
        isPremade: false,
        campaign: campaign(true),
      }),
    ).toBe(false);
    expect(
      canEditCharacter({
        isPlayer: false,
        isPremade: true,
        campaign: campaign(false),
      }),
    ).toBe(false);
  });
});
