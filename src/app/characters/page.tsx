import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  CharacterListView,
  parseCharacterListParams,
  type SearchParams,
} from '@/src/modules/character';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('character.list');
  return { title: t('title') };
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <CharacterListView params={parseCharacterListParams(await searchParams)} />
  );
}
