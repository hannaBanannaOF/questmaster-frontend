import { createHttpClient } from '@/src/lib/http/http.client';
import { Microservices } from '@/src/lib/http/services.types';

import { mapCharacterList } from '../character.mapper';
import { CharacterResponse } from './dto.types';

export async function getCharacters() {
  const client = createHttpClient(Microservices.core);
  const data = await client.get<CharacterResponse[]>('character');
  return mapCharacterList(data);
}
