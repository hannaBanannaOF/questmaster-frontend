import { useQuery } from '@tanstack/react-query';

import { userQueries } from './user.queries';

export function useUserInfo() {
  return useQuery(userQueries.detail());
}
