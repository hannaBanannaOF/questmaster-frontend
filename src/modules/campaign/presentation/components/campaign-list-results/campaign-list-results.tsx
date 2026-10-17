import { ArrowLeft, SearchX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, CollectionResults, ListState } from '@/src/design';
import { countPages } from '@/src/lib/pagination';
import { ListPagination } from '@/src/modules/shared/presentation';

import { getCampaigns } from '../../campaign.loaders';
import {
  CAMPAIGN_PAGE_SIZE,
  campaignListHref,
  type CampaignListParams,
  getHiddenBy,
} from '../../campaign-list.params';
import { CampaignResultsList } from './campaign-results-list';

/** A página pedida da lista; cabeçalho e filtros ficam fora e não piscam. */
export async function CampaignListResults(params: CampaignListParams) {
  const { page, role, status, q } = params;
  const [{ items, total }, t] = await Promise.all([
    getCampaigns({ role, status, q, sort: 'recent' }, page, CAMPAIGN_PAGE_SIZE),
    getTranslations('campaign.list'),
  ]);
  const pages = countPages(total, CAMPAIGN_PAGE_SIZE);

  // A view só chega aqui com campanhas: zero é a busca ou o filtro
  const hiddenBy = total === 0 ? getHiddenBy(params) : null;
  if (hiddenBy) {
    const clearHref =
      hiddenBy === 'search'
        ? campaignListHref({ role, status })
        : hiddenBy === 'filters'
          ? campaignListHref({ q })
          : campaignListHref({});
    return (
      <ListState
        id="campaigns-no-results"
        live
        icon={<SearchX />}
        title={t('noResults.title', {
          hasQ: q ? 'yes' : 'no',
          q: q ?? '',
          status: status ?? 'none',
          role: role ?? 'none',
        })}
        message={t(`noResults.message.${hiddenBy}`)}
        actions={
          <ButtonLink href={clearHref} variant="secondary">
            {t(`noResults.clear.${hiddenBy}`)}
          </ButtonLink>
        }
      />
    );
  }

  // Há campanhas, mas não nessa página: o link aponta além do fim
  if (items.length === 0) {
    const tPagination = await getTranslations('common.pagination.outOfRange');
    return (
      <ListState
        id="campaigns-out-of-range"
        icon={<SearchX />}
        title={tPagination('title')}
        message={tPagination('message', { count: pages })}
        actions={
          <ButtonLink
            href={campaignListHref({ q, role, status })}
            variant="secondary"
          >
            <ArrowLeft size={18} aria-hidden />
            {tPagination('action')}
          </ButtonLink>
        }
      />
    );
  }

  const nextParams = Object.fromEntries(
    Object.entries({ q, role, status }).filter(([, value]) => value),
  ) as Record<string, string>;

  return (
    <CollectionResults
      heading={t('page', { page, pages })}
      pagination={
        <ListPagination
          page={page}
          total={total}
          pageSize={CAMPAIGN_PAGE_SIZE}
          hrefFor={(target) =>
            campaignListHref({ q, role, status, page: target })
          }
          summary={(range) => t('range', range)}
        />
      }
    >
      <CampaignResultsList
        key={`${q}-${role}-${status}-${page}`}
        initialItems={items}
        total={total}
        firstShown={(page - 1) * CAMPAIGN_PAGE_SIZE}
        page={page}
        params={nextParams}
      />
    </CollectionResults>
  );
}
