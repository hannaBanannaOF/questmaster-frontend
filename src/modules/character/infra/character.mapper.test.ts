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
      toCharacterListQuery({
        gameSystem: GameSystem.CALL_OF_CTHULHU,
        withoutCampaign: true,
      }),
    ).toEqual({ game_system: 'CALL_OF_CTHULHU', without_campaign: true });
  });

  it('sem filtros, não envia nada', () => {
    expect(toCharacterListQuery()).toEqual({
      game_system: undefined,
      without_campaign: undefined,
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
