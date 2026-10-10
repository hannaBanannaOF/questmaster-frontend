import { parsePageNumber } from '@/src/lib/pagination';

export type SearchParams = Record<string, string | string[] | undefined>;

/** Estado da lista de personagens na URL: /characters?without_campaign=true&page=2 */
export interface CharacterListParams {
  page: number;
  withoutCampaign: boolean;
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function parseCharacterListParams(
  searchParams: SearchParams,
): CharacterListParams {
  return {
    page: parsePageNumber(first(searchParams.page)),
    withoutCampaign: first(searchParams.without_campaign) === 'true',
  };
}

/** Link da lista com esse filtro; a página 1 fica fora da URL. */
export function characterListHref({
  page,
  withoutCampaign,
}: Partial<CharacterListParams>) {
  const query = new URLSearchParams();
  if (withoutCampaign) query.set('without_campaign', 'true');
  if (page && page > 1) query.set('page', String(page));
  const search = query.toString();
  return search ? `/characters?${search}` : '/characters';
}
