'use client';

import { useParams } from 'next/navigation';

import { useCharacterDetail } from '@/src/modules/character/presentation/character.hooks';
import { CharacterDetailContainer } from '@/src/modules/character/presentation/character.ui';

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
  const { data, isFetching } = useCharacterDetail(id);
  return (
    data && <CharacterDetailContainer character={data} loading={isFetching} />
  );
}
