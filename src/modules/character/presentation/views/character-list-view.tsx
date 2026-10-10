import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ListPage, Loader, PageHeader, SegmentedNav } from '@/src/design';

import {
  characterListHref,
  type CharacterListParams,
} from '../character-list.params';
import { CharacterListResults } from '../components/character-list-results/character-list-results';
import { CreateCharacterButton } from '../components/create-character-button/create-character-button';

export async function CharacterListView({
  params,
}: {
  params: CharacterListParams;
}) {
  const t = await getTranslations('character.list');

  return (
    <ListPage
      header={
        <PageHeader
          title={t('title')}
          actions={<CreateCharacterButton label={t('new')} />}
        />
      }
    >
      <SegmentedNav
        label={t('filters.label')}
        items={[
          {
            href: characterListHref({}),
            label: t('filters.all'),
            current: !params.withoutCampaign,
          },
          {
            href: characterListHref({ withoutCampaign: true }),
            label: t('filters.withoutCampaign'),
            current: params.withoutCampaign,
          },
        ]}
      />
      {/* A key muda a cada página ou filtro: o Loader volta enquanto a nova página chega */}
      <Suspense
        key={`${params.withoutCampaign}-${params.page}`}
        fallback={<Loader size="lg" message={t('loading')} />}
      >
        <CharacterListResults {...params} />
      </Suspense>
    </ListPage>
  );
}
