'use client';

import { useTranslations } from 'next-intl';

import { CollectionList, LoadMoreFooter } from '@/src/design';
import { useLoadMore } from '@/src/modules/shared/presentation/hooks/use-load-more';

import type { CharacterSummary } from '../../../domain';
import { loadMoreCharactersAction } from '../../character.actions';
import { CharacterTile } from '../character-tile/character-tile';

interface CharacterResultsListProps {
  initialItems: CharacterSummary[];
  total: number;
  /** Quantas vêm antes da primeira mostrada (página da URL). */
  firstShown: number;
  page: number;
  /** Filtros atuais, como estão na URL. */
  params: Record<string, string>;
}

/** Grade de fichas; no celular, "Mostrar mais" acrescenta as próximas no fim. */
export function CharacterResultsList({
  initialItems,
  total,
  firstShown,
  page,
  params,
}: CharacterResultsListProps) {
  const t = useTranslations('character.list.more');
  const { items, pending, failed, loadMore } = useLoadMore(
    initialItems,
    page,
    (next) => loadMoreCharactersAction({ ...params, page: String(next) }),
  );
  const shown = firstShown + items.length;
  const done = shown >= total;

  return (
    <>
      <CollectionList layout="cards">
        {items.map((character) => (
          <li key={character.slug}>
            <CharacterTile character={character} />
          </li>
        ))}
      </CollectionList>
      <LoadMoreFooter
        done={done}
        pending={pending}
        failed={failed}
        onLoadMore={loadMore}
        labels={{
          action: t('action'),
          loading: t('loading'),
          error: t('error'),
          summary: done ? t('all', { total }) : t('progress', { shown, total }),
        }}
      />
    </>
  );
}
