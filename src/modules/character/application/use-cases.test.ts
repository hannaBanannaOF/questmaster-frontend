import { describe, expect, it, vi } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { aCharacter, aCharacterDetails } from '@/src/test/fixtures';

import { CharacterNotEditableError, InvalidHpError } from '../domain';
import type { CharacterRepository } from './character.repository';
import {
  makeCreateCharacter,
  makeDeleteCharacter,
  makeGetCharacterBySlug,
  makeListCharacters,
  makeUpdateCharacterHp,
} from './use-cases';

function fakeRepository(
  overrides: Partial<CharacterRepository> = {},
): CharacterRepository {
  return {
    list: vi.fn().mockResolvedValue([]),
    findById: vi.fn().mockResolvedValue(aCharacterDetails()),
    resolveSlug: vi.fn().mockResolvedValue(1),
    create: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    updateHp: vi.fn(async (_id, hp) => hp),
    ...overrides,
  };
}

describe('makeListCharacters', () => {
  it('repassa os filtros ao repositório', async () => {
    const characters = [aCharacter()];
    const repository = fakeRepository({
      list: vi.fn().mockResolvedValue(characters),
    });
    const filters = { withoutCampaign: true };

    await expect(makeListCharacters(repository)(filters)).resolves.toBe(
      characters,
    );
    expect(repository.list).toHaveBeenCalledWith(filters);
  });
});

describe('makeGetCharacterBySlug', () => {
  it('resolve o slug e busca pelo id', async () => {
    const repository = fakeRepository({
      resolveSlug: vi.fn().mockResolvedValue(7),
    });

    await makeGetCharacterBySlug(repository)('harvey');

    expect(repository.resolveSlug).toHaveBeenCalledWith('harvey');
    expect(repository.findById).toHaveBeenCalledWith(7);
  });
});

describe('makeCreateCharacter', () => {
  it('repassa o input ao repositório', async () => {
    const repository = fakeRepository();
    const input = {
      name: 'Harvey',
      hp: 12,
      system: GameSystem.CALL_OF_CTHULHU,
    };

    await makeCreateCharacter(repository)(input);

    expect(repository.create).toHaveBeenCalledWith(input);
  });
});

describe('makeDeleteCharacter', () => {
  it('o dono exclui a ficha', async () => {
    const character = aCharacterDetails({ isPlayer: true });
    const repository = fakeRepository({
      findById: vi.fn().mockResolvedValue(character),
    });

    await expect(makeDeleteCharacter(repository)(1)).resolves.toBe(character);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('recusa excluir a ficha de outro jogador', async () => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCharacterDetails({ isPlayer: false })),
    });

    await expect(makeDeleteCharacter(repository)(1)).rejects.toBeInstanceOf(
      CharacterNotEditableError,
    );
    expect(repository.delete).not.toHaveBeenCalled();
  });
});

describe('makeUpdateCharacterHp', () => {
  it.each([0, 12])('salva PV %d', async (hp) => {
    const repository = fakeRepository();

    await expect(makeUpdateCharacterHp(repository)(1, hp)).resolves.toBe(hp);
    expect(repository.updateHp).toHaveBeenCalledWith(1, hp);
  });

  it.each([-1, 2.5])('recusa PV %d sem chamar a API', async (hp) => {
    const repository = fakeRepository();

    await expect(
      makeUpdateCharacterHp(repository)(1, hp),
    ).rejects.toBeInstanceOf(InvalidHpError);
    expect(repository.updateHp).not.toHaveBeenCalled();
  });
});
