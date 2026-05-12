import { GameSystem } from '../rpg';
import { CharacterCreateFormData } from './domain/character.schema';
import { Character } from './domain/character.types';
import {
  CharacterCreateRequest,
  CharacterCurrentHpResponse,
  CharacterDetailResponse,
  CharacterListResponse,
  CharacterUpdateHpRequest,
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
    id: response.id,
    name: response.name,
    slug: response.slug,
    system: GameSystem[response.system as keyof typeof GameSystem],
    currentHp: response.current_hp,
    maxHp: response.max_hp,
  };
}

export function mapCharacterFormData(data: CharacterCreateFormData): CharacterCreateRequest {
  return {
    hp: data.hp,
    name: data.name,
    system: data.game_system
  };
}

export function mapHpRequest(newHp: number): CharacterUpdateHpRequest {
  return {
    new_hp: newHp
  };
}

export function mapCurrentHpResponse(response: CharacterCurrentHpResponse): number {
  return response.current_hp;
}