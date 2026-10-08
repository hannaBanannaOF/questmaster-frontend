import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CharacterListView } from '@/src/modules/character';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('character.list');
  return { title: t('title') };
}

export default function CharactersPage() {
  return <CharacterListView />;
}
