import { queryOptions } from '@tanstack/react-query';

import { getUserInfoUseCase } from '../application/usecases/get-user-info.usecase';

export const userQueries = {
  all: () => ['user-info'] as const,
  detail: () =>
    queryOptions({
      queryKey: userQueries.all(),
      queryFn: () => getUserInfoUseCase(),
      placeholderData: (prev) =>
        prev ?? {
          username: 'placeholder',
          name: 'placeholder',
          surname: 'placeholder',
        },
    }),
};
