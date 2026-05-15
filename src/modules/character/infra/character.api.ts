import { createHttpClient, Microservices } from '@/src/lib/http';

import {
  mapCharacterDetail,
  mapCharacterFormData,
  mapCharacterList,
  mapHpRequest,
} from '../character.mapper';
import { CharacterCreateFormData } from '../domain/character.schema';
import {
  CharacterCreateRequest,
  CharacterCurrentHpResponse,
  CharacterDetailResponse,
  CharacterListFilters,
  CharacterListResponse,
  CharacterUpdateHpRequest,
} from './dto.types';

const client = createHttpClient(Microservices.core);

export const getCharactersAPI = async (filters?: CharacterListFilters) =>
  mapCharacterList(
    await client.get<CharacterListResponse[], CharacterListFilters>(
      'character',
      filters,
    ),
  );

export const getCharacterDetailAPI = async (id: number) =>
  mapCharacterDetail(
    await client.get<CharacterDetailResponse>(`character/${id}`),
  );

export const createCharacterAPI = async (data: CharacterCreateFormData) =>
  client.post<undefined, CharacterCreateRequest>(
    'character',
    mapCharacterFormData(data),
  );

export const deleteCharacterAPI = async (id: number) =>
  client.delete(`character/${id}`);

export const updateCharacterHpAPI = async (newHp: number, id: number) => {
  const data = await client.patch<
    CharacterCurrentHpResponse,
    CharacterUpdateHpRequest
  >(`character/${id}/hp`, mapHpRequest(newHp));
  return data.current_hp;
};
