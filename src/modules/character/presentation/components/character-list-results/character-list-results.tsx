import { UserCheck, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, EmptyState } from '@/src/design';
import { countPages } from '@/src/lib/pagination';
import {
  ListPagination,
  PageOutOfRange,
} from '@/src/modules/shared/presentation';

import { getCharacters } from '../../character.loaders';
import {
  characterListHref,
  type CharacterListParams,
} from '../../character-list.params';
import { CharacterList } from '../character-list/character-list';
import { CreateCharacterButton } from '../create-character-button/create-character-button';

/** A página pedida da lista, com o paginador; o filtro fica fora e não pisca. */
export async function CharacterListResults({
  page,
  withoutCampaign,
}: CharacterListParams) {
  const [{ items, total }, t] = await Promise.all([
    getCharacters({ withoutCampaign: withoutCampaign || undefined }, page),
    getTranslations('character.list'),
  ]);

  if (total === 0) {
    return withoutCampaign ? (
      <EmptyState
        title={t('filtered.empty.title')}
        message={t('filtered.empty.message')}
        icon={<UserCheck size={48} />}
        action={
          <ButtonLink href={characterListHref({})} variant="outline">
            {t('filtered.empty.clear')}
          </ButtonLink>
        }
      />
    ) : (
      <EmptyState
        title={t('empty.title')}
        message={t('empty.message')}
        icon={<Users size={48} />}
        action={<CreateCharacterButton label={t('empty.create')} />}
      />
    );
  }

  // Há personagens, mas não nessa página: o link aponta além do fim
  if (items.length === 0) {
    return (
      <PageOutOfRange
        pageCount={countPages(total)}
        firstPageHref={characterListHref({ withoutCampaign })}
      />
    );
  }

  return (
    <>
      <CharacterList characters={items} />
      <ListPagination
        page={page}
        total={total}
        hrefFor={(target) =>
          characterListHref({ withoutCampaign, page: target })
        }
        summary={(range) => t('range', range)}
      />
    </>
  );
}
