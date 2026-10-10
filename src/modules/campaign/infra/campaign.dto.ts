export interface CampaignListResponse {
  slug: string;
  name: string;
  is_dm: boolean;
  status: string;
  system: string;
  player_count: number;
  my_characters: { slug: string; name: string }[];
}

export interface CampaignListPageResponse {
  items: CampaignListResponse[];
  total: number;
}

export interface CampaignListQuery {
  role?: string;
  status?: string;
  limit: number;
  offset: number;
  [key: string]: string | number | undefined;
}

export type CampaignStatusCountsResponse = Record<string, number>;

export interface CampaignDetailsResponse {
  id: number;
  is_dm: boolean;
  invite_hash?: string;
  name: string;
  overview?: string;
  slug: string;
  status: string;
  system: string;
  characters: { id: number; name: string }[];
}

export interface CampaignCreateRequest {
  name: string;
  system: string;
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
