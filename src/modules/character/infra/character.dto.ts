export interface CharacterListResponse {
  slug: string;
  name: string;
  system: string;
  current_hp?: number;
  max_hp?: number;
}

export interface CharacterDetailsResponse extends CharacterListResponse {
  id: number;
  is_player: boolean;
}

export interface CharacterListPageResponse {
  items: CharacterListResponse[];
  total: number;
}

export interface CharacterListQuery {
  game_system?: string;
  without_campaign?: boolean;
  limit: number;
  offset: number;
  [key: string]: string | number | boolean | undefined;
}

export interface CharacterCreateRequest {
  name: string;
  hp: number;
  system: string;
}

export interface CharacterHpRequest {
  new_hp: number;
}

export interface CharacterHpResponse {
  current_hp: number;
}

export interface SlugResolveResponse {
  id: number;
}
