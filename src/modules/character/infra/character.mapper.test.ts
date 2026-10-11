import { describe, expect, it } from 'vitest';

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
        current_hp: 8,
        max_hp: 12,
      }),
    ).toEqual({
      slug: 'harvey',
      name: 'Harvey',
      system: GameSystem.CALL_OF_CTHULHU,
      currentHp: 8,
      maxHp: 12,
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
    ).toMatchObject({ id: 3, isPlayer: true, maxHp: undefined });
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
        hp: 12,
        system: GameSystem.CALL_OF_CTHULHU,
      }),
    ).toEqual({ name: 'Harvey', hp: 12, system: 'CALL_OF_CTHULHU' });
  });
});
