import { queryOptions } from '@tanstack/react-query';

import { GameSystem } from '../../rpg/domain/game-system.types';
import { getCampaignDetailsUseCase, getCampaignsUseCase } from '../application';
import { CampaignStatus } from '../domain';

export const campaignQueries = {
  all: () => ['campaigns'] as const,
  list: () =>
    queryOptions({
      queryKey: campaignQueries.all(),
      queryFn: () => getCampaignsUseCase(),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...campaignQueries.all(), id] as const,
      queryFn: () => getCampaignDetailsUseCase(id),
      placeholderData: (prev) =>
        prev ?? {
          id: 0,
          dmed: false,
          name: 'Placeholder',
          playerCount: 0,
          slug: 'placeholder',
          status: CampaignStatus.DRAFT,
          system: GameSystem.CALL_OF_CTHULHU,
          characters: [],
        },
    }),
};
