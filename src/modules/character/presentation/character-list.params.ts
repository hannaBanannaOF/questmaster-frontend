import { parsePageNumber } from '@/src/lib/pagination';

export type SearchParams = Record<string, string | string[] | undefined>;

/** Fichas por página: múltiplo das 2, 3 e 4 colunas da grade. */
export const CHARACTER_PAGE_SIZE = 12;
/** O core recusa buscas maiores (change character-list-search). */
const MAX_QUERY_LENGTH = 100;

/** Estado da lista de personagens na URL: /characters?q=eleanor&without_campaign=true&page=2 */
export interface CharacterListParams {
  page: number;
  withoutCampaign: boolean;
  /** Busca pelo nome, já sem espaços nas pontas. */
  q?: string;
}

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function parseCharacterListParams(
  searchParams: SearchParams,
): CharacterListParams {
  const q = first(searchParams.q)?.trim().slice(0, MAX_QUERY_LENGTH);
  return {
    page: parsePageNumber(first(searchParams.page)),
    withoutCampaign: first(searchParams.without_campaign) === 'true',
    q: q || undefined,
  };
}

/** Link da lista com esse filtro; a página 1 fica fora da URL. */
export function characterListHref({
  page,
  withoutCampaign,
  q,
}: Partial<CharacterListParams>) {
  const query = new URLSearchParams();
  if (q) query.set('q', q);
  if (withoutCampaign) query.set('without_campaign', 'true');
  if (page && page > 1) query.set('page', String(page));
  const search = query.toString();
  return search ? `/characters?${search}` : '/characters';
}

/** O que escondeu as fichas, para o texto e o botão de limpar. */
export function getCharactersHiddenBy({
  q,
  withoutCampaign,
}: CharacterListParams): 'search' | 'filter' | 'both' | null {
  if (q) return withoutCampaign ? 'both' : 'search';
  return withoutCampaign ? 'filter' : null;
}
