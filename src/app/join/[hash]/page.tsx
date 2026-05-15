'use client';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';
import { useInviteDetails } from '@/src/modules/invite';
import { InviteDetailsContainer } from '@/src/modules/invite/presentation/components/invite-details-container/invite-details-container.ui';

export default function JoinCampaignPage() {
  const params = useParams();
  const rawHash = params.hash;

  if (!rawHash || Array.isArray(rawHash)) {
    throw new Error('Invalid hash param');
  }

  const hash = String(rawHash);

  if (hash === '') {
    throw new Error('Hash must not be null');
  }
  const { data, isFetching, isError, error } = useInviteDetails(hash);

  const { addToast } = useToast();
  const t = useTranslations('invite.toast');
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      addToast(t('error.detail'), error.message, 'error');
      router.replace('/');
    }
  }, [isError, router, error, addToast, t]);

  return data && <InviteDetailsContainer invite={data} loading={isFetching} />;
}
