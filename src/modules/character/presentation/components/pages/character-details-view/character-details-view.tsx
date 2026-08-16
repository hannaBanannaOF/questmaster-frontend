'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';

import { useCharacterDetail } from '../../../character.hooks';
import { CharacterDetailContainer } from '../../templates';

export function CharacterDetailsView({ id }: { id: number }) {
  const { data, isPending, isError, error } = useCharacterDetail(id);
  const router = useRouter();
  const { addToast } = useToast();
  const t = useTranslations('character.toast');

  useEffect(() => {
    if (isError) {
      addToast(t('error.detail'), error.message, 'error');
      router.replace('/characters');
    }
  }, [isError, router, error, addToast, t]);

  return (
    data && <CharacterDetailContainer character={data} loading={isPending} />
  );
}
