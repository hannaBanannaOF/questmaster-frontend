import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GameSystem } from '../../rpg/domain/game-system.types';
import { getCampaignDetailsUseCase } from '../application/get-campaign-details.usecase';
import { getCampaignsUseCase } from '../application/get-campaigns.usecase';
import { updateCampaignStatusUseCase } from '../application/update-campaign-status.usecase';
import { CampaignDetails } from '../domain/campaign.types';
import { CampaignStatus } from '../domain/campaign-status.types';

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaignsUseCase,
  });
}

export function useCampaignDetails(id: number) {
  return useQuery({
    queryKey: ['campaigns', id],
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
  });
}

export function useUpdateCampaignStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: CampaignStatus }) =>
      updateCampaignStatusUseCase(id, status),

    onMutate: async ({ id, status: newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['campaigns', id] });
      const previousData = queryClient.getQueryData(['campaigns', id]);

      queryClient.setQueryData(['campaigns', id], (old: CampaignDetails) =>
        old ? { ...old, status: newStatus } : old,
      );

      return { previousData, id };
    },

    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['campaigns', context.id],
          context.previousData,
        );
      }
    },

    onSuccess: (returnedStatus, { id }) => {
      queryClient.setQueryData(['campaigns', id], (old: CampaignDetails) =>
        old ? { ...old, status: returnedStatus } : old,
      );
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}
