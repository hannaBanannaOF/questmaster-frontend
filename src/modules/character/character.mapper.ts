import { GameSystem } from '../rpg';
import { CharacterCreateFormData } from './domain/character.schema';
import { Character, CharacterDetail } from './domain/character.types';
import {
  CharacterCreateRequest,
  CharacterCurrentHpResponse,
  CharacterDetailResponse,
  CharacterListResponse,
  CharacterUpdateHpRequest,
} from './infra/dto.types';

const toGameSystem = (val: string) => GameSystem[val as keyof typeof GameSystem];

export const mapCharacterList = (response: CharacterListResponse[]): Character[] =>
  response.map((character) => ({
      slug: character.slug,
      name: character.name,
      system: toGameSystem(character.system),
      currentHp: character.current_hp,
      maxHp: character.max_hp,
  }));

export const mapCharacterDetail = (response: CharacterDetailResponse): CharacterDetail =>
  ({
    id: response.id,
    name: response.name,
    slug: response.slug,
    system: toGameSystem(response.system),
    currentHp: response.current_hp,
    maxHp: response.max_hp,
    isPlayer: response.is_player,
  });

export const mapCharacterFormData = (data: CharacterCreateFormData): CharacterCreateRequest => 
  ({
    hp: data.hp,
    name: data.name,
    system: data.game_system
  });

export const mapHpRequest = (newHp: number): CharacterUpdateHpRequest =>
  ({
    new_hp: newHp
  });

export const mapCurrentHpResponse = (response: CharacterCurrentHpResponse): number => response.current_hp;