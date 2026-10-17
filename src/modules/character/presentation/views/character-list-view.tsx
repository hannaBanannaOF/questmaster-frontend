import { Users } from 'lucide-react';
import { unstable_rethrow } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import {
  ButtonLink,
  CollectionHeader,
  CollectionPage,
  CollectionSearch,
  CollectionSkeleton,
  CollectionToolbar,
  ListState,
  SearchField,
  Tabs,
} from '@/src/design';
import { CriticalFailure } from '@/src/modules/shared/presentation';

import { getCharacters } from '../character.loaders';
import {
  characterListHref,
  type CharacterListParams,
} from '../character-list.params';
import { CharacterListResults } from '../components/character-list-results/character-list-results';
import { CreateCharacterButton } from '../components/create-character-button/create-character-button';

/** Total de fichas do usuário, sem filtros; undefined se a busca falhou. */
async function countAllCharacters() {
  try {
    return (await getCharacters({}, 1, 1)).total;
  } catch (error) {
    unstable_rethrow(error);
    console.error(error);
    return undefined;
  }
}

export async function CharacterListView({
  params,
}: {
  params: CharacterListParams;
}) {
  const [total, t] = await Promise.all([
    countAllCharacters(),
    getTranslations('character.list'),
  ]);
  const { q, withoutCampaign } = params;

  const header = (
    <CollectionHeader
      title={t('title')}
      count={total || undefined}
      countLabel={total ? t('count', { count: total }) : undefined}
      action={
        <CreateCharacterButton
          label={t('new')}
          variant="primary"
          compactLabel
        />
      }
    />
  );

  // Erro e lista vazia não têm o que filtrar: a barra de filtros sai
  if (total === undefined) {
    return (
      <CollectionPage>
        {header}
        <CriticalFailure
          title={t('error.title')}
          message={t('error.message')}
          secondaryAction={
            <ButtonLink href="/" variant="tertiary">
              {t('error.back')}
            </ButtonLink>
          }
        />
      </CollectionPage>
    );
  }

  if (total === 0) {
    return (
      <CollectionPage>
        {header}
        <ListState
          id="characters-empty"
          icon={<Users />}
          title={t('empty.title')}
          message={t('empty.message')}
          actions={
            <CreateCharacterButton
              label={t('empty.create')}
              variant="primary"
            />
          }
        />
      </CollectionPage>
    );
  }

  return (
    <CollectionPage>
      {header}
      <CollectionToolbar>
        <CollectionSearch>
          {/* Form GET: Enter busca e o filtro atual vai junto */}
          <form action="/characters" role="search">
            {withoutCampaign && (
              <input type="hidden" name="without_campaign" value="true" />
            )}
            <SearchField
              name="q"
              label={t('search.label')}
              placeholder={t('search.placeholder')}
              defaultValue={q}
              clearHref={q ? characterListHref({ withoutCampaign }) : undefined}
              clearLabel={t('search.clear')}
            />
          </form>
        </CollectionSearch>
        <Tabs
          label={t('filters.label')}
          items={[
            {
              href: characterListHref({ q }),
              label: t('filters.all'),
              current: !withoutCampaign,
            },
            {
              href: characterListHref({ q, withoutCampaign: true }),
              label: t('filters.withoutCampaign'),
              current: withoutCampaign,
            },
          ]}
        />
      </CollectionToolbar>
      {/* A key muda a cada busca, filtro ou página: só a grade vira esqueleto */}
      <Suspense
        key={`${q}-${withoutCampaign}-${params.page}`}
        fallback={
          <CollectionSkeleton layout="cards" loadingLabel={t('loading')} />
        }
      >
        <CharacterListResults {...params} />
      </Suspense>
    </CollectionPage>
  );
}
