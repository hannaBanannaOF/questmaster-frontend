import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { NotFoundError } from '@/src/lib/errors';

import type { CharacterFilters } from '../application';
import { characterUseCases } from '../character.container';

export const getCharacters = cache((filters?: CharacterFilters) =>
  characterUseCases.listCharacters(filters),
);

export const getCharacterBySlug = cache(async (slug: string) => {
  try {
    return await characterUseCases.getCharacterBySlug(slug);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});
