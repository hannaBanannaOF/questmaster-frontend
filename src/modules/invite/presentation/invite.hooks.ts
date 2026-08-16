import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useToast } from '@/src/design';
import { CampaignDetails } from '@/src/modules/campaign';

import { acceptInviteUseCase, createInviteUseCase } from '../application';
import { inviteQueries } from './invite.queries';

export function useCreateInvite() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('invite.toast');

  return useMutation({
    mutationFn: (campaignId: number) => createInviteUseCase(campaignId),
    onSuccess: (hash, variables) => {
      queryClient.setQueryData<CampaignDetails>(
        ['campaigns', variables],
        (old) => (old ? { ...old, inviteHash: hash } : undefined),
      );

      addToast(
        t('success.create.title'),
        t('success.create.message'),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.create'), error.message, 'error');
    },
  });
}

export function useInviteDetails(hash: string) {
  return useQuery(inviteQueries.detail(hash));
}

export function useAcceptInvite() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const t = useTranslations('invite.toast');

  return useMutation({
    mutationFn: ({
      hash,
      characterSlug,
    }: {
      hash: string;
      characterSlug: string;
      campaignName: string;
    }) => acceptInviteUseCase(hash, characterSlug),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['campaigns'],
      });

      addToast(
        t('success.join.title'),
        t('success.join.message', { name: variables.campaignName }),
        'success',
      );
    },
    onError: (error) => {
      addToast(t('error.join'), error.message, 'error');
    },
  });
}
