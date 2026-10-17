import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '@/src/modules/campaign/domain';
import { GameSystem } from '@/src/modules/rpg/domain';

import {
  toCharacterCreateRequest,
  toCharacterDetails,
  toCharacterListQuery,
  toCharacterSummary,
} from './character.mapper';

describe('toCharacterSummary', () => {
  it('converte o item da lista', () => {
    expect(
      toCharacterSummary({
        slug: 'harvey',
        name: 'Harvey',
        system: 'CALL_OF_CTHULHU',
      }),
    ).toEqual({
      slug: 'harvey',
      name: 'Harvey',
      system: GameSystem.CALL_OF_CTHULHU,
    });
  });
});

describe('toCharacterSummary · último acesso', () => {
  const base = { slug: 'harvey', name: 'Harvey', system: 'CALL_OF_CTHULHU' };

  it('converte a data do último acesso', () => {
    expect(
      toCharacterSummary({ ...base, last_accessed_at: '2026-10-11T09:00:00Z' })
        .lastAccessedAt,
    ).toEqual(new Date('2026-10-11T09:00:00Z'));
  });

  it.each([null, undefined])('sem acesso (%s) fica indefinido', (value) => {
    expect(
      toCharacterSummary({ ...base, last_accessed_at: value }).lastAccessedAt,
    ).toBeUndefined();
  });
});

describe('toCharacterSummary · campanha', () => {
  const base = { slug: 'harvey', name: 'Harvey', system: 'CALL_OF_CTHULHU' };

  it('mantém a campanha da ficha', () => {
    const campaign = { slug: 'innsmouth', name: 'Horror em Innsmouth' };
    expect(toCharacterSummary({ ...base, campaign }).campaign).toEqual(
      campaign,
    );
  });

  it('distingue sem campanha (null) de API que não informa (ausente)', () => {
    expect(toCharacterSummary({ ...base, campaign: null }).campaign).toBeNull();
    expect(toCharacterSummary(base).campaign).toBeUndefined();
  });
});

describe('toCharacterDetails', () => {
  it('inclui id e se o usuário é o dono', () => {
    expect(
      toCharacterDetails({
        id: 3,
        is_player: true,
        slug: 'harvey',
        name: 'Harvey',
        system: 'CALL_OF_CTHULHU',
      }),
    ).toMatchObject({ id: 3, isPlayer: true, campaign: undefined });
  });

  it('traz a campanha com o papel de quem vê, o apelido e a ficha pronta', () => {
    expect(
      toCharacterDetails({
        id: 4,
        is_player: false,
        slug: 'daisy',
        name: 'Daisy',
        system: 'CALL_OF_CTHULHU',
        campaign: {
          id: 9,
          slug: 'mascaras',
          name: 'Máscaras',
          status: 'ACTIVE',
          is_dm: true,
          dm_name: 'Hanna',
        },
        player_name: null,
        is_premade: true,
      }),
    ).toMatchObject({
      campaign: {
        id: 9,
        slug: 'mascaras',
        status: CampaignStatus.ACTIVE,
        isDm: true,
        dmName: 'Hanna',
      },
      playerName: undefined,
      isPremade: true,
    });
  });

  it('sem campanha, null', () => {
    expect(
      toCharacterDetails({
        id: 3,
        is_player: true,
        slug: 'jack',
        name: 'Jack',
        system: 'CALL_OF_CTHULHU',
        campaign: null,
      }).campaign,
    ).toBeNull();
  });
});

describe('toCharacterListQuery', () => {
  it('converte os filtros para a query da API', () => {
    expect(
      toCharacterListQuery(
        { gameSystem: GameSystem.CALL_OF_CTHULHU, withoutCampaign: true },
        { limit: 10, offset: 20 },
      ),
    ).toEqual({
      game_system: 'CALL_OF_CTHULHU',
      without_campaign: true,
      sort: undefined,
      limit: 10,
      offset: 20,
    });
  });

  it('leva sort=recent quando pedido', () => {
    expect(
      toCharacterListQuery({ sort: 'recent' }, { limit: 5, offset: 0 }).sort,
    ).toBe('recent');
  });

  it('sem filtros, envia só a página', () => {
    expect(toCharacterListQuery({}, { limit: 5, offset: 0 })).toEqual({
      game_system: undefined,
      without_campaign: undefined,
      sort: undefined,
      limit: 5,
      offset: 0,
    });
  });
});

describe('toCharacterCreateRequest', () => {
  it('monta o corpo da criação', () => {
    expect(
      toCharacterCreateRequest({
        name: 'Harvey',
        system: GameSystem.CALL_OF_CTHULHU,
      }),
    ).toEqual({ name: 'Harvey', system: 'CALL_OF_CTHULHU' });
  });
});
