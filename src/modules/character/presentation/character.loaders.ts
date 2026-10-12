import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { isNotFoundOrForbidden } from '@/src/lib/errors';
import { PAGE_SIZE, toPageRequest } from '@/src/lib/pagination';

import type { CharacterFilters } from '../application';
import { characterUseCases } from '../character.container';

/** Uma página da lista de personagens; `size` muda só em prévias e no convite. */
export const getCharacters = (
  filters: CharacterFilters,
  page: number,
  size = PAGE_SIZE,
) => characterUseCases.listCharacters(filters, toPageRequest(page, size));

export const getCharacterBySlug = cache(async (slug: string) => {
  try {
    return await characterUseCases.getCharacterBySlug(slug);
  } catch (error) {
    if (isNotFoundOrForbidden(error)) notFound();
    throw error;
  }
});
