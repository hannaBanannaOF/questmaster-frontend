import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapCharacterDetail, mapCharacterList } from '../character.mapper';
import { CharacterDetailResponse, CharacterListResponse } from './dto.types';

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
