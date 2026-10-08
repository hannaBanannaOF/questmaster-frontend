import { getTranslations } from 'next-intl/server';

import { ListPage, PageHeader } from '@/src/design';

import { getCharacters } from '../character.loaders';
import { CharacterList } from '../components/character-list/character-list';
import { CreateCharacterButton } from '../components/create-character-button/create-character-button';

export async function CharacterListView() {
  const [characters, t] = await Promise.all([
    getCharacters(),
    getTranslations('character.list'),
  ]);

  return (
    <ListPage
      header={
        <PageHeader
          title={t('title')}
          actions={<CreateCharacterButton label={t('new')} />}
        />
      }
    >
      <CharacterList characters={characters} />
    </ListPage>
  );
}
