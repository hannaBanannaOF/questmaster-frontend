import { describe, expect, it } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';

import { CampaignStatus } from '../domain';
import {
  toCampaignCreateRequest,
  toCampaignDetails,
  toCampaignListQuery,
  toCampaignStatusCounts,
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
        my_characters: [{ slug: 'harvey', name: 'Harvey Walters' }],
      }),
    ).toEqual({
      slug: 'mascaras',
      name: 'Máscaras',
      isDm: true,
      status: CampaignStatus.ACTIVE,
      system: GameSystem.CALL_OF_CTHULHU,
      playerCount: 3,
      myCharacters: [{ slug: 'harvey', name: 'Harvey Walters' }],
    });
  });
});

describe('toCampaignListQuery', () => {
  it('junta filtros e página na query da API', () => {
    expect(
      toCampaignListQuery(
        { role: 'player', status: CampaignStatus.PAUSED },
        { limit: 10, offset: 30 },
      ),
    ).toEqual({ role: 'player', status: 'PAUSED', limit: 10, offset: 30 });
  });
});

describe('toCampaignStatusCounts', () => {
  it('preenche com zero os status que faltarem', () => {
    expect(toCampaignStatusCounts({ ACTIVE: 2, ARCHIVED: 1 })).toEqual({
      [CampaignStatus.DRAFT]: 0,
      [CampaignStatus.ACTIVE]: 2,
      [CampaignStatus.PAUSED]: 0,
      [CampaignStatus.ARCHIVED]: 1,
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
