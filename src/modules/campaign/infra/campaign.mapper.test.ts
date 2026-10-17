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

describe('toCampaignSummary · último acesso', () => {
  const base = {
    slug: 'mascaras',
    name: 'Máscaras',
    is_dm: false,
    status: 'ACTIVE',
    system: 'CALL_OF_CTHULHU',
    player_count: 3,
    my_characters: [],
  };

  it('converte a data do último acesso', () => {
    expect(
      toCampaignSummary({ ...base, last_accessed_at: '2026-10-10T18:30:00Z' })
        .lastAccessedAt,
    ).toEqual(new Date('2026-10-10T18:30:00Z'));
  });

  it.each([null, undefined])('sem acesso (%s) fica indefinido', (value) => {
    expect(
      toCampaignSummary({ ...base, last_accessed_at: value }).lastAccessedAt,
    ).toBeUndefined();
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

  it('leva o filtro de campanhas sem jogadores só quando pedido', () => {
    const page = { limit: 5, offset: 0 };
    expect(
      toCampaignListQuery({ withoutPlayers: true }, page).without_players,
    ).toBe(true);
    expect(toCampaignListQuery({}, page).without_players).toBeUndefined();
  });

  it('leva a busca pelo nome', () => {
    expect(
      toCampaignListQuery({ q: 'boston' }, { limit: 12, offset: 0 }).q,
    ).toBe('boston');
  });

  it('leva sort=recent só quando pedido', () => {
    expect(
      toCampaignListQuery({ sort: 'recent' }, { limit: 5, offset: 0 }).sort,
    ).toBe('recent');
    expect(toCampaignListQuery({}, { limit: 5, offset: 0 }).sort).toBe(
      undefined,
    );
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

  it('leva os nomes do mestre e dos jogadores quando o core manda', () => {
    const details = toCampaignDetails({
      id: 1,
      slug: 'innsmouth',
      name: 'Innsmouth',
      is_dm: false,
      status: 'ACTIVE',
      system: 'CALL_OF_CTHULHU',
      dm_name: 'Ana',
      characters: [
        { id: 1, name: 'Eleanor', player_name: 'Rafa' },
        { id: 2, name: 'Pete', player_name: null },
      ],
    });

    expect(details.dmName).toBe('Ana');
    expect(details.characters.map((c) => c.playerName)).toEqual([
      'Rafa',
      undefined,
    ]);
  });

  it('converte os personagens da party, com e sem os campos novos', () => {
    const { characters } = toCampaignDetails({
      id: 1,
      slug: 'mascaras',
      name: 'Máscaras',
      is_dm: true,
      status: 'ACTIVE',
      system: 'CALL_OF_CTHULHU',
      characters: [
        {
          id: 1,
          name: 'Harvey',
          slug: 'harvey',
          is_mine: true,
        },
        { id: 2, name: 'Jenny', slug: 'jenny' },
        { id: 3, name: 'Velho' },
      ],
    });

    expect(characters).toEqual([
      {
        id: 1,
        name: 'Harvey',
        slug: 'harvey',
        isMine: true,
      },
      { id: 2, name: 'Jenny', slug: 'jenny', isMine: false },
      { id: 3, name: 'Velho', isMine: false },
    ]);
  });

  it('converte as fichas prontas; ausentes viram lista vazia', () => {
    const base = {
      id: 1,
      slug: 'mascaras',
      name: 'Máscaras',
      is_dm: true,
      status: 'DRAFT',
      system: 'CALL_OF_CTHULHU',
      characters: [],
    };

    expect(toCampaignDetails(base).premadeCharacters).toEqual([]);
    expect(
      toCampaignDetails({
        ...base,
        premade_characters: [{ id: 4, name: 'Pronta', slug: 'pronta' }],
      }).premadeCharacters,
    ).toEqual([
      {
        id: 4,
        name: 'Pronta',
        slug: 'pronta',
        isMine: false,
      },
    ]);
  });
});

describe('toCampaignCreateRequest', () => {
  it('monta o corpo da criação', () => {
    expect(
      toCampaignCreateRequest({
        name: 'Nova',
        system: GameSystem.CALL_OF_CTHULHU,
        dmName: 'Hanna',
      }),
    ).toEqual({
      name: 'Nova',
      system: 'CALL_OF_CTHULHU',
      dm_name: 'Hanna',
      overview: undefined,
    });
  });
});
