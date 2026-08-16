'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { useInviteDetails } from '../../../invite.hooks';
import { InviteDetailsContainer } from '../../templates';

export function InviteDetailsView({ hash }: { hash: string }) {
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

  if (!data) return null;

  return <InviteDetailsContainer invite={data} loading={isFetching} />;
}
