import type { HttpClient } from '@/src/lib/http';
import { mapPage } from '@/src/lib/pagination';

import type { CharacterRepository } from '../application';
import type {
  CharacterDetailsResponse,
  CharacterEditRequest,
  CharacterEditResponse,
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
    const response = await http.post<{ slug: string }>(
      'character',
      toCharacterCreateRequest(input),
    );
    return response.slug;
  },

  async delete(id) {
    await http.delete(`character/${id}`);
  },

  async edit(id, input) {
    const response = await http.patch<CharacterEditResponse>(
      `character/${id}`,
      { name: input.name } satisfies CharacterEditRequest,
    );
    return response.slug;
  },
});
