import { GameSystem } from '../rpg/domain/game-system.types';
import { Character } from './domain/character.types';
import {
  CharacterDetailResponse,
  CharacterListResponse,
} from './infra/dto.types';

export function mapCharacterList(
  response: CharacterListResponse[],
): Character[] {
  return response.map((character) => {
    return {
      slug: character.slug,
      name: character.name,
      system: GameSystem[character.system as keyof typeof GameSystem],
      currentHp: character.current_hp,
      maxHp: character.max_hp,
    };
  });
}

export function mapCharacterDetail(
  response: CharacterDetailResponse,
): Character {
  return {
    name: response.name,
    slug: '',
    system: GameSystem[response.system as keyof typeof GameSystem],
    currentHp: response.current_hp,
    maxHp: response.max_hp,
  };
}
