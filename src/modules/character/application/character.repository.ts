import { Character, CharacterDetail } from '../domain';
import { CharacterListFilters } from '../infra/dto.types';

export type CreateCharacterInput = {
  name: string;
  hp: number;
  system: string;
};

export interface CharacterRepository {
  getCharacters(filters?: CharacterListFilters): Promise<Character[]>;
  getCharacterDetail(id: number): Promise<CharacterDetail>;
  createCharacter(data: CreateCharacterInput): Promise<void>;
  deleteCharacter(id: number): Promise<void>;
  updateCharacterHp(id: number, newHp: number): Promise<number>;
}
