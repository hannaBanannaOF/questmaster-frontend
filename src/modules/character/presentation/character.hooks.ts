import { useQuery } from '@tanstack/react-query';

import { GameSystem } from '../../rpg/domain/game-system.types';
import { getCharacterDetailUseCase } from '../application/get-character-detail.usecase';
import { getCharactersUseCase } from '../application/get-characters.usecase';

export function useCharacter() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharactersUseCase,
  });
}

export function useCharacterDetail(id: number) {
  return useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterDetailUseCase(id),
    placeholderData: (prev) =>
      prev ?? {
        slug: 'placeholder',
        name: 'Placeholder',
        system: GameSystem.CALL_OF_CTHULHU,
        currentHp: 0,
        maxHp: 0,
      },
  });
}
