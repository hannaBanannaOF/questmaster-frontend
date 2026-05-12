import { createHttpClient, Microservices } from '@/src/lib/http';

import { mapCharacterDetail, mapCharacterFormData, mapCharacterList, mapCurrentHpResponse, mapHpRequest } from '../character.mapper';
import { CharacterCreateFormData } from '../domain/character.schema';
import { CharacterCreateRequest, CharacterCurrentHpResponse, CharacterDetailResponse, CharacterListResponse, CharacterUpdateHpRequest } from './dto.types';

export async function getCharactersAPI() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CharacterListResponse[]>('character');
  return mapCharacterList(data);
}

export async function getCharacterDetailAPI(id: number) {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CharacterDetailResponse>(`character/${id}`);
  return mapCharacterDetail(data);
}

export async function createCreateAPI(data: CharacterCreateFormData) {
  const parsedData = mapCharacterFormData(data);
  const client = createHttpClient(Microservices.core);
  await client.post<undefined, CharacterCreateRequest>('character', parsedData);
}

export async function deleteCharacterAPI(id: number) {
  const client = createHttpClient(Microservices.core);
  await client.delete(`character/${id}`);
}

export async function updateCharacterHpAPI(newHp: number, id: number) {
  const parsedData = mapHpRequest(newHp);
  const client = createHttpClient(Microservices.core);
  const data = await client.patch<CharacterCurrentHpResponse, CharacterUpdateHpRequest>(`character/${id}/hp`, parsedData);
  return mapCurrentHpResponse(data);
}
