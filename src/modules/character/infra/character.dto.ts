export interface CharacterListResponse {
  slug: string;
  name: string;
  system: string;
  /** Ausente nas versões do core anteriores a `dashboard-list-fields`. */
  campaign?: { slug: string; name: string } | null;
  last_accessed_at?: string | null;
}

export interface CharacterDetailsResponse extends Omit<
  CharacterListResponse,
  'campaign'
> {
  id: number;
  is_player: boolean;
  /** Ausentes antes de character-details-context no core. */
  campaign?: {
    id: number;
    slug: string;
    name: string;
    status: string;
    is_dm: boolean;
    dm_name?: string | null;
  } | null;
  player_name?: string | null;
  is_premade?: boolean;
}

export interface CharacterListPageResponse {
  items: CharacterListResponse[];
  total: number;
}

export interface CharacterListQuery {
  game_system?: string;
  without_campaign?: boolean;
  q?: string;
  sort?: string;
  limit: number;
  offset: number;
  [key: string]: string | number | boolean | undefined;
}

export interface CharacterCreateRequest {
  name: string;
  system: string;
}

export interface SlugResolveResponse {
  id: number;
}

export interface CharacterEditRequest {
  name: string;
}

export interface CharacterEditResponse {
  slug: string;
}
