import type { HttpClient } from '@/src/lib/http';
import { mapPage } from '@/src/lib/pagination';

import type { CharacterRepository } from '../application';
import type {
  CharacterDetailsResponse,
  CharacterHpRequest,
  CharacterHpResponse,
  CharacterListPageResponse,
  SlugResolveResponse,
} from './character.dto';
import {
  toCharacterCreateRequest,
  toCharacterDetails,
  toCharacterListQuery,
  toCharacterSummary,
} from './character.mapper';

export const createCharacterHttpRepository = (
  http: HttpClient,
): CharacterRepository => ({
  async list(filters, page) {
    const response = await http.get<CharacterListPageResponse>(
      'character',
      toCharacterListQuery(filters, page),
    );
    return mapPage(response, toCharacterSummary);
  },

  async findById(id) {
    return toCharacterDetails(
      await http.get<CharacterDetailsResponse>(`character/${id}`),
    );
  },

  async resolveSlug(slug) {
    const response = await http.get<SlugResolveResponse>(
      `character/resolve/${encodeURIComponent(slug)}`,
    );
    return response.id;
  },

  async create(input) {
    await http.post<void>('character', toCharacterCreateRequest(input));
  },

  async delete(id) {
    await http.delete(`character/${id}`);
  },

  async updateHp(id, hp) {
    const response = await http.patch<CharacterHpResponse>(
      `character/${id}/hp`,
      { new_hp: hp } satisfies CharacterHpRequest,
    );
    return response.current_hp;
  },
});
