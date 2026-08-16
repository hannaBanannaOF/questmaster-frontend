import { createHttpClient, Microservices } from '@/src/lib/http';

import {
  CharacterRepository,
  CreateCharacterInput,
} from '../application/character.repository';
import { Character, CharacterDetail } from '../domain';
import {
  mapCharacterDetail,
  mapCharacterList,
  mapHpRequest,
} from './character.mapper';
import {
  CharacterCreateRequest,
  CharacterCurrentHpResponse,
  CharacterDetailResponse,
  CharacterListFilters,
  CharacterListResponse,
  CharacterUpdateHpRequest,
} from './dto.types';

const client = createHttpClient(Microservices.core);

export const characterApiRepository: CharacterRepository = {
  async getCharacters(filters?: CharacterListFilters): Promise<Character[]> {
    const response = await client.get<
      CharacterListResponse[],
      CharacterListFilters
    >('character', filters);
    return mapCharacterList(response);
  },

  async getCharacterDetail(id: number): Promise<CharacterDetail> {
    const response = await client.get<CharacterDetailResponse>(
      `character/${id}`,
    );
    return mapCharacterDetail(response);
  },

  async createCharacter(data: CreateCharacterInput): Promise<void> {
    await client.post<undefined, CharacterCreateRequest>('character', {
      name: data.name,
      hp: data.hp,
      system: data.system,
    });
  },

  async deleteCharacter(id: number): Promise<void> {
    await client.delete(`character/${id}`);
  },

  async updateCharacterHp(id: number, newHp: number): Promise<number> {
    const data = await client.patch<
      CharacterCurrentHpResponse,
      CharacterUpdateHpRequest
    >(`character/${id}/hp`, mapHpRequest(newHp));
    return data.current_hp;
  },
};
