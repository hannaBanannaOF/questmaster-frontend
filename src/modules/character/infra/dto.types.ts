export type CharacterListResponse = {
  slug: string;
  name: string;
  system: string;
  current_hp?: number;
  max_hp?: number;
};

export type CharacterDetailResponse = CharacterListResponse & {
  id: number;
  is_player: boolean;
};

export type CharacterCreateRequest = {
  hp: number;
  name: string;
  system: string;
};

export type CharacterUpdateHpRequest = {
  new_hp: number;
};

export type CharacterCurrentHpResponse = {
  current_hp: number;
};

export type CharacterListFilters = {
  game_system?: string;
  without_campaign?: boolean;
};
