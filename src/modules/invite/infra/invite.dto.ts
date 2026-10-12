export interface CreateInviteRequest {
  campaign_id: number;
}

export interface CreateInviteResponse {
  hash: string;
}

export interface InviteDetailsResponse {
  invite_hash: string;
  campaign_slug: string;
  campaign_name: string;
  campaign_overview?: string;
  campaign_player_count: number;
  is_dm: boolean;
  campaign_system: string;
  premade_characters?: {
    slug: string;
    name: string;
    current_hp?: number | null;
    max_hp?: number | null;
  }[];
}

export interface AcceptInviteRequest {
  character_slug: string;
}
