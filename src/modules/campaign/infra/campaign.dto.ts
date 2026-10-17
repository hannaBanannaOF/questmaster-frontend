export interface CampaignListResponse {
  slug: string;
  name: string;
  is_dm: boolean;
  status: string;
  system: string;
  player_count: number;
  my_characters: { slug: string; name: string }[];
  last_accessed_at?: string | null;
}

export interface CampaignListPageResponse {
  items: CampaignListResponse[];
  total: number;
}

export interface CampaignListQuery {
  role?: string;
  status?: string;
  q?: string;
  without_players?: boolean;
  sort?: string;
  limit: number;
  offset: number;
  [key: string]: string | number | boolean | undefined;
}

export type CampaignStatusCountsResponse = Record<string, number>;

export interface CampaignDetailsResponse {
  id: number;
  is_dm: boolean;
  invite_hash?: string;
  name: string;
  overview?: string;
  dm_name?: string | null;
  slug: string;
  status: string;
  system: string;
  characters: CampaignCharacterResponse[];
  premade_characters?: CampaignCharacterResponse[];
}

export interface CampaignCharacterResponse {
  id: number;
  name: string;
  slug?: string;
  is_mine?: boolean;
  player_name?: string | null;
}

export interface PremadeCharacterCreateRequest {
  name: string;
}

export interface TableNameRequest {
  name: string;
}

export interface TableNameResponse {
  name: string;
}

export interface CampaignCreateResponse {
  slug: string;
}

export interface CampaignCreateRequest {
  name: string;
  system: string;
  dm_name: string;
  overview?: string;
}

export interface CampaignStatusRequest {
  status: string;
}

export interface CampaignStatusResponse {
  status: string;
}

export interface SlugResolveResponse {
  id: number;
}
