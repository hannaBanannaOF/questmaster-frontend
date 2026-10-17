import { ArrowLeft, SearchX, UserCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, CollectionResults, ListState } from '@/src/design';
import { countPages } from '@/src/lib/pagination';
import { ListPagination } from '@/src/modules/shared/presentation';

import { getCharacters } from '../../character.loaders';
import {
  CHARACTER_PAGE_SIZE,
  characterListHref,
  type CharacterListParams,
  getCharactersHiddenBy,
} from '../../character-list.params';
import { CharacterResultsList } from './character-results-list';

/** A página pedida da lista; cabeçalho e filtros ficam fora e não piscam. */
export async function CharacterListResults(params: CharacterListParams) {
  const { page, withoutCampaign, q } = params;
  const [{ items, total }, t] = await Promise.all([
    getCharacters(
      { withoutCampaign: withoutCampaign || undefined, q, sort: 'recent' },
      page,
      CHARACTER_PAGE_SIZE,
    ),
    getTranslations('character.list'),
  ]);
  const pages = countPages(total, CHARACTER_PAGE_SIZE);

  // A view só chega aqui com fichas: zero é a busca ou o filtro
  const hiddenBy = total === 0 ? getCharactersHiddenBy(params) : null;
  if (hiddenBy) {
    // Só há busca e um filtro: limpar o que escondeu é sempre a lista toda
    const clearHref = characterListHref({});
    return (
      <ListState
        id="characters-no-results"
        live
        icon={hiddenBy === 'filter' ? <UserCheck /> : <SearchX />}
        title={t(`noResults.${hiddenBy}.title`, { q: q ?? '' })}
        message={t(`noResults.${hiddenBy}.message`)}
        actions={
          <ButtonLink href={clearHref} variant="secondary">
            {t(`noResults.${hiddenBy}.clear`)}
          </ButtonLink>
        }
      />
    );
  }

  // Há fichas, mas não nessa página: o link aponta além do fim
  if (items.length === 0) {
    const tPagination = await getTranslations('common.pagination.outOfRange');
    return (
      <ListState
        id="characters-out-of-range"
        icon={<SearchX />}
        title={tPagination('title')}
        message={tPagination('message', { count: pages })}
        actions={
          <ButtonLink
            href={characterListHref({ q, withoutCampaign })}
            variant="secondary"
          >
            <ArrowLeft size={18} aria-hidden />
            {tPagination('action')}
          </ButtonLink>
        }
      />
    );
  }

  const nextParams: Record<string, string> = {};
  if (q) nextParams.q = q;
  if (withoutCampaign) nextParams.without_campaign = 'true';

  return (
    <CollectionResults
      heading={t('page', { page, pages })}
      pagination={
        <ListPagination
          page={page}
          total={total}
          pageSize={CHARACTER_PAGE_SIZE}
          hrefFor={(target) =>
            characterListHref({ q, withoutCampaign, page: target })
          }
          summary={(range) => t('range', range)}
        />
      }
    >
      <CharacterResultsList
        key={`${q}-${withoutCampaign}-${page}`}
        initialItems={items}
        total={total}
        firstShown={(page - 1) * CHARACTER_PAGE_SIZE}
        page={page}
        params={nextParams}
      />
    </CollectionResults>
  );
}
