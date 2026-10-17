import { parsePageNumber } from '@/src/lib/pagination';

import {
  type CampaignRole,
  type CampaignStatus,
  isCampaignRole,
  isCampaignStatus,
} from '../domain';

export type SearchParams = Record<string, string | string[] | undefined>;

/** Campanhas por página: múltiplo de 1 e 2 colunas. */
export const CAMPAIGN_PAGE_SIZE = 12;
/** O core recusa buscas maiores (change campaign-list-search). */
const MAX_QUERY_LENGTH = 100;

/** Estado da lista de campanhas guardado na URL: /campaigns?q=boston&role=dm&status=PAUSED&page=2 */
export interface CampaignListParams {
  page: number;
  role?: CampaignRole;
  status?: CampaignStatus;
  /** Busca pelo nome, já sem espaços nas pontas. */
  q?: string;
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Valores desconhecidos na URL são ignorados, não viram erro. */
export function parseCampaignListParams(
  searchParams: SearchParams,
): CampaignListParams {
  const role = first(searchParams.role);
  const status = first(searchParams.status);
  const q = first(searchParams.q)?.trim().slice(0, MAX_QUERY_LENGTH);
  return {
    page: parsePageNumber(first(searchParams.page)),
    role: isCampaignRole(role) ? role : undefined,
    status: isCampaignStatus(status) ? status : undefined,
    q: q || undefined,
  };
}

/** Link da lista com esses filtros; a página 1 fica fora da URL. */
export function campaignListHref({
  page,
  role,
  status,
  q,
}: Partial<CampaignListParams>) {
  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (role) query.set('role', role);
  if (status) query.set('status', status);
  if (page && page > 1) query.set('page', String(page));
  const search = query.toString();
  return search ? `/campaigns?${search}` : '/campaigns';
}

export function hasCampaignFilters(params: CampaignListParams) {
  return Boolean(params.role || params.status);
}

/** O que escondeu as campanhas, para o texto e o botão de limpar. */
export function getHiddenBy(
  params: CampaignListParams,
): 'search' | 'filters' | 'both' | null {
  const filters = hasCampaignFilters(params);
  if (params.q) return filters ? 'both' : 'search';
  return filters ? 'filters' : null;
}
