'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useToast } from '@/src/design';
import {
  CharacterDetailContainer,
  useCharacterDetail,
} from '@/src/modules/character';

export default function CharacterDetailPage() {
  const params = useParams();
  const rawId = params.id;

  if (!rawId || Array.isArray(rawId)) {
    throw new Error('Invalid id param');
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    throw new Error('Id must be a number');
  }
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
