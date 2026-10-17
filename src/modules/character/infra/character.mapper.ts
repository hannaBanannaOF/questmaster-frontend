import type { PageRequest } from '@/src/lib/pagination';
import type { CampaignStatus } from '@/src/modules/campaign/domain';
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
  campaign: response.campaign,
  lastAccessedAt: response.last_accessed_at
    ? new Date(response.last_accessed_at)
    : undefined,
});

export const toCharacterDetails = (
  response: CharacterDetailsResponse,
): CharacterDetails => ({
  ...toCharacterSummary({ ...response, campaign: undefined }),
  id: response.id,
  isPlayer: response.is_player,
  campaign: response.campaign && {
    id: response.campaign.id,
    slug: response.campaign.slug,
    name: response.campaign.name,
    status: response.campaign.status as CampaignStatus,
    isDm: response.campaign.is_dm,
    dmName: response.campaign.dm_name ?? undefined,
  },
  playerName: response.player_name ?? undefined,
  isPremade: response.is_premade,
});

export const toCharacterListQuery = (
  filters: CharacterFilters,
  page: PageRequest,
): CharacterListQuery => ({
  game_system: filters.gameSystem,
  without_campaign: filters.withoutCampaign,
  q: filters.q,
  sort: filters.sort,
  limit: page.limit,
  offset: page.offset,
});

export const toCharacterCreateRequest = (
  input: CreateCharacterInput,
): CharacterCreateRequest => ({
  name: input.name,
  system: input.system,
});
