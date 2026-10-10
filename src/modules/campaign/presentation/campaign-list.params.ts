import { parsePageNumber } from '@/src/lib/pagination';

import {
  type CampaignRole,
  type CampaignStatus,
  isCampaignRole,
  isCampaignStatus,
} from '../domain';

export type SearchParams = Record<string, string | string[] | undefined>;

/** Estado da lista de campanhas guardado na URL: /campaigns?role=dm&status=PAUSED&page=2 */
export interface CampaignListParams {
  page: number;
  role?: CampaignRole;
  status?: CampaignStatus;
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Valores desconhecidos na URL são ignorados, não viram erro. */
export function parseCampaignListParams(
  searchParams: SearchParams,
): CampaignListParams {
  const role = first(searchParams.role);
  const status = first(searchParams.status);
  return {
    page: parsePageNumber(first(searchParams.page)),
    role: isCampaignRole(role) ? role : undefined,
    status: isCampaignStatus(status) ? status : undefined,
  };
}

/** Link da lista com esses filtros; a página 1 fica fora da URL. */
export function campaignListHref({
  page,
  role,
  status,
}: Partial<CampaignListParams>) {
  const query = new URLSearchParams();
  if (role) query.set('role', role);
  if (status) query.set('status', status);
  if (page && page > 1) query.set('page', String(page));
  const search = query.toString();
  return search ? `/campaigns?${search}` : '/campaigns';
}

export function hasCampaignFilters(params: CampaignListParams) {
  return Boolean(params.role || params.status);
}
