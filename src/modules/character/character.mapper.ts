import { RpgKind } from '../rpg/domain/rpg-kind.types';
import { Character } from './domain/character.types';
import { CharacterResponse } from './infra/dto.types';

export function mapCharacter(response: CharacterResponse): Character {
  return {
    slug: response.slug,
    name: response.name,
    system: RpgKind[response.system as keyof typeof RpgKind],
  };
}

export function mapCharacterList(response: CharacterResponse[]): Character[] {
  return response.map(mapCharacter);
}
