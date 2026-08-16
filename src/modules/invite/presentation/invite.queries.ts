import { queryOptions } from '@tanstack/react-query';

import { GameSystem } from '@/src/modules/rpg';

import { getInviteDetailsUseCase } from '../application';

export const inviteQueries = {
  all: () => ['invite'] as const,
  detail: (hash: string) =>
    queryOptions({
      queryKey: [...inviteQueries.all(), hash] as const,
      queryFn: () => getInviteDetailsUseCase(hash),
      placeholderData: (prev) =>
        prev ?? {
          inviteHash: 'placeholder',
          campaignSlug: 'placeholder',
          campaignName: 'Placeholder',
          campaignPlayerCount: 0,
          campaignSystem: GameSystem.CALL_OF_CTHULHU,
          campaignOverview: 'Placeholder',
        },
    }),
};
