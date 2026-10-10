import { Scroll, SearchX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, EmptyState } from '@/src/design';
import { countPages } from '@/src/lib/pagination';
import {
  ListPagination,
  PageOutOfRange,
} from '@/src/modules/shared/presentation';

import { getCampaigns } from '../../campaign.loaders';
import {
  campaignListHref,
  type CampaignListParams,
  hasCampaignFilters,
} from '../../campaign-list.params';
import { CampaignList } from '../campaign-list/campaign-list';
import { CreateCampaignButton } from '../create-campaign-button/create-campaign-button';

/** A página pedida da lista, com o paginador; os filtros ficam fora e não piscam. */
export async function CampaignListResults(params: CampaignListParams) {
  const { page, role, status } = params;
  const [{ items, total }, t] = await Promise.all([
    getCampaigns({ role, status }, page),
    getTranslations('campaign.list'),
  ]);

  if (total === 0) {
    return hasCampaignFilters(params) ? (
      <EmptyState
        title={t('filtered.empty.title')}
        message={t('filtered.empty.message')}
        icon={<SearchX size={48} />}
        action={
          <ButtonLink href={campaignListHref({})} variant="outline">
            {t('filtered.empty.clear')}
          </ButtonLink>
        }
      />
    ) : (
      <EmptyState
        title={t('empty.title')}
        message={t('empty.message')}
        icon={<Scroll size={48} />}
        action={<CreateCampaignButton label={t('empty.create')} />}
      />
    );
  }

  // Há campanhas, mas não nessa página: o link aponta além do fim
  if (items.length === 0) {
    return (
      <PageOutOfRange
        pageCount={countPages(total)}
        firstPageHref={campaignListHref({ role, status })}
      />
    );
  }

  return (
    <>
      <CampaignList campaigns={items} />
      <ListPagination
        page={page}
        total={total}
        hrefFor={(target) => campaignListHref({ role, status, page: target })}
        summary={(range) => t('range', range)}
      />
    </>
  );
}
