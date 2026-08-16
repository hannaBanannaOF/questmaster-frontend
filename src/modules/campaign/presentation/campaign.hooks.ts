'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import {
  createCampaignUseCase,
  deleteCampaignUseCase,
  updateCampaignStatusUseCase,
} from '../application';
import { Campaign, CampaignDetails, CampaignStatus } from '../domain';
import { campaignQueries } from './campaign.queries';

export function useCampaigns() {
  const t = useTranslations('campaign.toast');
  const { addToast } = useToast();

  const query = useQuery(campaignQueries.list());

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
      await queryClient.invalidateQueries({
        queryKey: campaignQueries.all(),
      });
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
  return useQuery(campaignQueries.detail(id));
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('campaign.toast');

  return useMutation({
    mutationFn: ({ id }: { id: number; name: string }) =>
      deleteCampaignUseCase(id),
    onSuccess: async (_, { id, name }) => {
      queryClient.removeQueries({
        queryKey: campaignQueries.detail(id).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: campaignQueries.all(),
      });
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
      const detailQueryKey = campaignQueries.detail(id).queryKey;
      const listQueryKey = campaignQueries.list().queryKey;

      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailQueryKey }),
        queryClient.cancelQueries({ queryKey: listQueryKey }),
      ]);

      const previousCampaign =
        queryClient.getQueryData<CampaignDetails>(detailQueryKey);
      const previousList = queryClient.getQueryData<Campaign[]>(listQueryKey);

      queryClient.setQueryData(detailQueryKey, (old?: CampaignDetails) =>
        old ? { ...old, status } : undefined,
      );

      if (previousCampaign?.slug) {
        queryClient.setQueryData(listQueryKey, (oldList?: Campaign[]) => {
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
      const detailQueryKey = campaignQueries.detail(variables.id).queryKey;
      const listQueryKey = campaignQueries.list().queryKey;

      if (context?.previousCampaign) {
        queryClient.setQueryData(detailQueryKey, context.previousCampaign);
      }
      if (context?.previousList) {
        queryClient.setQueryData(listQueryKey, context.previousList);
      }
      addToast(t('error.update'), error.message, 'error');
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: campaignQueries.detail(variables.id).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: campaignQueries.all(),
      });
    },
  });
}
