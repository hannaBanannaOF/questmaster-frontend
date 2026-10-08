import { describe, expect, it } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';

import { CampaignStatus } from '../domain';
import {
  toCampaignCreateRequest,
  toCampaignDetails,
  toCampaignSummary,
} from './campaign.mapper';

describe('toCampaignSummary', () => {
  it('converte o item da lista', () => {
    expect(
      toCampaignSummary({
        slug: 'mascaras',
        name: 'Máscaras',
        is_dm: true,
        status: 'ACTIVE',
        system: 'CALL_OF_CTHULHU',
        player_count: 3,
      }),
    ).toEqual({
      slug: 'mascaras',
      name: 'Máscaras',
      isDm: true,
      status: CampaignStatus.ACTIVE,
      system: GameSystem.CALL_OF_CTHULHU,
      playerCount: 3,
    });
  });
});

describe('toCampaignDetails', () => {
  it('converte o detalhe e conta os jogadores pelos personagens', () => {
    const details = toCampaignDetails({
      id: 1,
      slug: 'mascaras',
      name: 'Máscaras',
      is_dm: false,
      status: 'PAUSED',
      system: 'CALL_OF_CTHULHU',
      overview: 'Nova York, 1925.',
      invite_hash: 'abc123',
      characters: [
        { id: 1, name: 'Harvey' },
        { id: 2, name: 'Jenny' },
      ],
    });

    expect(details).toMatchObject({
      id: 1,
      isDm: false,
      status: CampaignStatus.PAUSED,
      overview: 'Nova York, 1925.',
      inviteHash: 'abc123',
      playerCount: 2,
    });
  });
});

describe('toCampaignCreateRequest', () => {
  it('monta o corpo da criação', () => {
    expect(
      toCampaignCreateRequest({
        name: 'Nova',
        system: GameSystem.CALL_OF_CTHULHU,
      }),
    ).toEqual({
      name: 'Nova',
      system: 'CALL_OF_CTHULHU',
      overview: undefined,
    });
  });
});
