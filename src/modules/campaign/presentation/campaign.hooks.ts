import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { GameSystem } from '../../rpg/domain/game-system.types';
import { deleteCampaignUseCase } from '../application';
import { createCampaignUseCase } from '../application/create-campaign.usecase';
import { getCampaignDetailsUseCase } from '../application/get-campaign-details.usecase';
import { getCampaignsUseCase } from '../application/get-campaigns.usecase';
import { updateCampaignStatusUseCase } from '../application/update-campaign-status.usecase';
import { Campaign, CampaignDetails } from '../domain/campaign.types';
import { CampaignStatus } from '../domain/campaign-status.types';

export function useCampaigns() {
  const t = useTranslations('campaign.toast');
  const { addToast } = useToast();

  const query = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaignsUseCase,
  });

  const { error, isError } = query;

  useEffect(() => {
    if (isError) {
      addToast(t('error.list'), error.message, 'error');
    }
  }, [isError, error, addToast, t]);

  return query;
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('campaign.toast');
  return useMutation({
    mutationFn: createCampaignUseCase,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      addToast(
        t('success.create.title'),
        t('success.create.message', { name: variables.name }),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.create'), error.message, 'error');
    },
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

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('campaign.toast');

  return useMutation({
    mutationFn: ({ id }: { id: number; name: string }) =>
      deleteCampaignUseCase(id),
    onSuccess: async (_, { id, name }) => {
      queryClient.removeQueries({ queryKey: ['campaigns', id] });
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      addToast(
        t('success.delete.title'),
        t('success.delete.message', { name }),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.delete'), error.message, 'error');
    },
  });
}

export function useUpdateCampaignStatus() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('campaign.toast');

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: CampaignStatus }) =>
      updateCampaignStatusUseCase(id, status),

    onMutate: async ({ id, status }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['campaigns', id] }),
        queryClient.cancelQueries({ queryKey: ['campaigns'] }),
      ]);

      const previousCampaign = queryClient.getQueryData<CampaignDetails>([
        'campaigns',
        id,
      ]);
      const previousList = queryClient.getQueryData<Campaign[]>(['campaigns']);

      queryClient.setQueryData(['campaigns', id], (old?: CampaignDetails) =>
        old ? { ...old, status } : undefined,
      );

      if (previousCampaign?.slug) {
        queryClient.setQueryData(['campaigns'], (oldList?: Campaign[]) => {
          if (!Array.isArray(oldList)) return oldList;
          return oldList.map((campaign) =>
            campaign.slug === previousCampaign.slug
              ? { ...campaign, status }
              : campaign,
          );
        });
      }

      return { previousCampaign, previousList };
    },

    onError: (error, variables, context) => {
      if (context?.previousCampaign) {
        queryClient.setQueryData(
          ['campaigns', variables.id],
          context.previousCampaign,
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(['campaigns'], context.previousList);
      }
      addToast(t('error.update'), error.message, 'error');
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}
