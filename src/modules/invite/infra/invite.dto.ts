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
  dm_name?: string | null;
  premade_characters?: { slug: string; name: string }[];
}

export interface AcceptInviteRequest {
  character_slug: string;
  /** Apelido do jogador nesta campanha (1 a 50). */
  player_name: string;
}
