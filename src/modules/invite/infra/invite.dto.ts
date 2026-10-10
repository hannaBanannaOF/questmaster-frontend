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
}

export interface AcceptInviteRequest {
  character_slug: string;
}
