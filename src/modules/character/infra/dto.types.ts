export type CharacterListResponse = {
  slug: string;
  name: string;
  system: string;
  current_hp?: number;
  max_hp?: number;
};

export type CharacterDetailResponse = {
  id: number;
  name: string;
  system: string;
  max_hp?: number;
  current_hp?: number;
};
