import { useQuery } from '@tanstack/react-query';

import { getCharactersUseCase } from '../application/get-characters.usecase';

export function useCharacter() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: getCharactersUseCase,
  });
}
