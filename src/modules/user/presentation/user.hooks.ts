import { useQuery } from '@tanstack/react-query';

import { getUserInfoUseCase } from '../application';

export function useUserInfo() {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfoUseCase,
    placeholderData: (prev) =>
      prev ?? {
        username: 'placeholder',
        name: 'placeholder',
        surname: 'placeholder',
      },
  });
}
