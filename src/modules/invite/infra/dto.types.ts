export type CreateInviteRequest = {
  campaign_id: number;
};

export type CreateInviteResponse = {
  hash: string;
};

export type InviteDetailsResponse = {
  invite_hash: string;
  campaign_slug: string;
  campaign_name: string;
  campaign_overview?: string;
  campaign_player_count: number;
  campaign_system: string;
};

export type AcceptInviteRequest = {
  character_slug: string;
};
