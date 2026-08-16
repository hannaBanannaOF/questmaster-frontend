import { queryOptions } from '@tanstack/react-query';

import { GameSystem } from '@/src/modules/rpg';

import {
  getCharacterDetailUseCase,
  getCharactersUseCase,
} from '../application';
import { CharacterListFilters } from '../infra/dto.types';

export const characterQueries = {
  all: () => ['characters'] as const,
  list: (filters?: CharacterListFilters) =>
    queryOptions({
      queryKey: filters
        ? ([...characterQueries.all(), filters] as const)
        : characterQueries.all(),
      queryFn: () => getCharactersUseCase(filters),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...characterQueries.all(), id] as const,
      queryFn: () => getCharacterDetailUseCase(id),
      placeholderData: (prev) =>
        prev ?? {
          id: 0,
          slug: 'placeholder',
          name: 'Placeholder',
          system: GameSystem.CALL_OF_CTHULHU,
          currentHp: 0,
          maxHp: 0,
          isPlayer: false,
        },
    }),
};
