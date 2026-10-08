import type { Metadata } from 'next';

import {
  CharacterDetailsView,
  getCharacterBySlug,
} from '@/src/modules/character';

interface CharacterPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);
  return { title: character.name };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  return <CharacterDetailsView slug={slug} />;
}
