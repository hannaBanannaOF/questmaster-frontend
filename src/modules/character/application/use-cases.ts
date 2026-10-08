import {
  canEditCharacter,
  CharacterNotEditableError,
  InvalidHpError,
  isValidHp,
} from '../domain';
import type {
  CharacterFilters,
  CharacterRepository,
  CreateCharacterInput,
} from './character.repository';

export const makeListCharacters =
  (characters: CharacterRepository) => (filters?: CharacterFilters) =>
    characters.list(filters);

export const makeGetCharacterBySlug =
  (characters: CharacterRepository) => async (slug: string) =>
    characters.findById(await characters.resolveSlug(slug));

export const makeCreateCharacter =
  (characters: CharacterRepository) => (input: CreateCharacterInput) =>
    characters.create(input);

export const makeDeleteCharacter =
  (characters: CharacterRepository) => async (id: number) => {
    const character = await characters.findById(id);
    if (!canEditCharacter(character)) throw new CharacterNotEditableError();
    await characters.delete(id);
    return character;
  };

export const makeUpdateCharacterHp =
  (characters: CharacterRepository) => async (id: number, hp: number) => {
    // O teto (PV máximo) é validado pela API, que conhece a ficha atual
    if (!isValidHp(hp)) throw new InvalidHpError();
    return characters.updateHp(id, hp);
  };
