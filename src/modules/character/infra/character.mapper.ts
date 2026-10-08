import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CharacterFilters, CreateCharacterInput } from '../application';
import type { CharacterDetails, CharacterSummary } from '../domain';
import type {
  CharacterCreateRequest,
  CharacterDetailsResponse,
  CharacterListQuery,
  CharacterListResponse,
} from './character.dto';

export const toCharacterSummary = (
  response: CharacterListResponse,
): CharacterSummary => ({
  slug: response.slug,
  name: response.name,
  system: response.system as GameSystem,
  currentHp: response.current_hp,
  maxHp: response.max_hp,
});

export const toCharacterDetails = (
  response: CharacterDetailsResponse,
): CharacterDetails => ({
  ...toCharacterSummary(response),
  id: response.id,
  isPlayer: response.is_player,
});

export const toCharacterListQuery = (
  filters: CharacterFilters = {},
): CharacterListQuery => ({
  game_system: filters.gameSystem,
  without_campaign: filters.withoutCampaign,
});

export const toCharacterCreateRequest = (
  input: CreateCharacterInput,
): CharacterCreateRequest => ({
  name: input.name,
  hp: input.hp,
  system: input.system,
});
