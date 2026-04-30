export type CampaignListResponse = {
  slug: string;
  name: string;
  is_dm: boolean;
  status: string;
  system: string;
  player_count: number;
};

export type CampaignDetailsResponse = {
  id: number;
  is_dm: boolean;
  invite_hash?: string;
  name: string;
  overview?: string;
  slug: string;
  status: string;
  system: string;
  characters: {
    id: number;
    name: string;
  }[];
};

export type UpdateCampaignStatusRequest = {
  status: string;
};

export type UpdateCampaignStatusResponse = {
  status: string;
};
