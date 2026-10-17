import { useTranslations } from 'next-intl';

import {
  CollectionHeader,
  CollectionPage,
  CollectionSkeleton,
} from '@/src/design';

/** Primeira carga da rota: o título real e a grade em esqueleto. */
export function CharacterListLoading() {
  const t = useTranslations('character.list');
  return (
    <CollectionPage>
      <CollectionHeader title={t('title')} />
      <CollectionSkeleton layout="cards" loadingLabel={t('loading')} />
    </CollectionPage>
  );
}
