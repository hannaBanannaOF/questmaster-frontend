'use client';

import { useTranslations } from 'next-intl';

import { CollectionList, LoadMoreFooter } from '@/src/design';
import { useLoadMore } from '@/src/modules/shared/presentation/hooks/use-load-more';

import type { CampaignSummary } from '../../../domain';
import { loadMoreCampaignsAction } from '../../campaign.actions';
import { CampaignRow } from '../campaign-row/campaign-row';

interface CampaignResultsListProps {
  initialItems: CampaignSummary[];
  total: number;
  /** Quantas vêm antes da primeira mostrada (página da URL). */
  firstShown: number;
  page: number;
  /** Filtros atuais, como estão na URL. */
  params: Record<string, string>;
}

/**
 * Linhas da página atual. No celular, "Mostrar mais" acrescenta as próximas
 * no fim sem trocar de página; a partir de 48rem quem navega é a paginação.
 */
export function CampaignResultsList({
  initialItems,
  total,
  firstShown,
  page,
  params,
}: CampaignResultsListProps) {
  const t = useTranslations('campaign.list.more');
  const { items, pending, failed, loadMore } = useLoadMore(
    initialItems,
    page,
    (next) => loadMoreCampaignsAction({ ...params, page: String(next) }),
  );
  const shown = firstShown + items.length;
  const done = shown >= total;

  return (
    <>
      <CollectionList layout="rows">
        {items.map((campaign) => (
          <li key={campaign.slug}>
            <CampaignRow campaign={campaign} hideDetail />
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
