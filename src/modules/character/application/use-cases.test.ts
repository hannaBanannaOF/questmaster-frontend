import { describe, expect, it, vi } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { aCharacter, aCharacterDetails } from '@/src/test/fixtures';

import { CharacterNotEditableError } from '../domain';
import type { CharacterRepository } from './character.repository';
import {
  makeCreateCharacter,
  makeDeleteCharacter,
  makeEditCharacter,
  makeGetCharacterBySlug,
  makeListCharacters,
} from './use-cases';

function fakeRepository(
  overrides: Partial<CharacterRepository> = {},
): CharacterRepository {
  return {
    list: vi.fn().mockResolvedValue({ items: [], total: 0 }),
    findById: vi.fn().mockResolvedValue(aCharacterDetails()),
    resolveSlug: vi.fn().mockResolvedValue(1),
    create: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    edit: vi.fn().mockResolvedValue('jao'),
    ...overrides,
  };
}

describe('makeListCharacters', () => {
  it('repassa filtros e página ao repositório', async () => {
    const page = { items: [aCharacter()], total: 1 };
    const repository = fakeRepository({
      list: vi.fn().mockResolvedValue(page),
    });
    const filters = { withoutCampaign: true };
    const request = { limit: 10, offset: 0 };

    await expect(
      makeListCharacters(repository)(filters, request),
    ).resolves.toBe(page);
    expect(repository.list).toHaveBeenCalledWith(filters, request);
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

describe('makeEditCharacter', () => {
  it('edita e devolve o slug novo', async () => {
    const repository = fakeRepository();

    await expect(
      makeEditCharacter(repository)(1, { name: 'Jão' }),
    ).resolves.toBe('jao');
    expect(repository.edit).toHaveBeenCalledWith(1, { name: 'Jão' });
  });
});
