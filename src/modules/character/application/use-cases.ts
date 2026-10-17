import type { PageRequest } from '@/src/lib/pagination';

import { canEditCharacter, CharacterNotEditableError } from '../domain';
import type {
  CharacterFilters,
  CharacterRepository,
  CreateCharacterInput,
  EditCharacterInput,
} from './character.repository';

export const makeListCharacters =
  (characters: CharacterRepository) =>
  (filters: CharacterFilters, page: PageRequest) =>
    characters.list(filters, page);

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

export const makeEditCharacter =
  (characters: CharacterRepository) =>
  (id: number, input: EditCharacterInput) =>
    characters.edit(id, input);
