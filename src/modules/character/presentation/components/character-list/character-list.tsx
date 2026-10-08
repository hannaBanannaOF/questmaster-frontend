import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { EmptyState, List, ListItem } from '@/src/design';

import type { CharacterSummary } from '../../../domain';
import { CharacterCard } from '../character-card/character-card';
import { CreateCharacterButton } from '../create-character-button/create-character-button';

export function CharacterList({
  characters,
}: {
  characters: CharacterSummary[];
}) {
  const t = useTranslations('character.list');

  if (characters.length === 0) {
    return (
      <EmptyState
        title={t('empty.title')}
        message={t('empty.message')}
        icon={<Users size={48} />}
        action={<CreateCharacterButton label={t('empty.create')} />}
      />
    );
  }

  return (
    <List>
      {characters.map((character) => (
        <ListItem key={character.slug}>
          <CharacterCard character={character} />
        </ListItem>
      ))}
    </List>
  );
}
