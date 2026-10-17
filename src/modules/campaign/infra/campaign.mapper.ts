import type { PageRequest } from '@/src/lib/pagination';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type {
  CampaignListFilters,
  CreateCampaignInput,
  CreatePremadeCharacterInput,
} from '../application';
import {
  type CampaignCharacter,
  type CampaignDetails,
  CampaignStatus,
  type CampaignStatusCounts,
  type CampaignSummary,
} from '../domain';
import type {
  CampaignCharacterResponse,
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListQuery,
  CampaignListResponse,
  CampaignStatusCountsResponse,
  PremadeCharacterCreateRequest,
} from './campaign.dto';

const toCampaignCharacter = (
  character: CampaignCharacterResponse,
): CampaignCharacter => ({
  id: character.id,
  name: character.name,
  slug: character.slug,
  isMine: character.is_mine ?? false,
  playerName: character.player_name ?? undefined,
});

export const toCampaignSummary = (
  response: CampaignListResponse,
): CampaignSummary => ({
  slug: response.slug,
  name: response.name,
  system: response.system as GameSystem,
  status: response.status as CampaignStatus,
  isDm: response.is_dm,
  playerCount: response.player_count,
  myCharacters: response.my_characters ?? [],
  lastAccessedAt: response.last_accessed_at
    ? new Date(response.last_accessed_at)
    : undefined,
});

export const toCampaignDetails = (
  response: CampaignDetailsResponse,
): CampaignDetails => ({
  id: response.id,
  slug: response.slug,
  name: response.name,
  system: response.system as GameSystem,
  status: response.status as CampaignStatus,
  isDm: response.is_dm,
  overview: response.overview,
  dmName: response.dm_name ?? undefined,
  characters: response.characters.map(toCampaignCharacter),
  premadeCharacters: (response.premade_characters ?? []).map(
    toCampaignCharacter,
  ),
  playerCount: response.characters.length,
  inviteHash: response.invite_hash,
});

export const toCampaignListQuery = (
  filters: CampaignListFilters,
  page: PageRequest,
): CampaignListQuery => ({
  role: filters.role,
  status: filters.status,
  q: filters.q,
  without_players: filters.withoutPlayers || undefined,
  sort: filters.sort,
  limit: page.limit,
  offset: page.offset,
});

// Status que a API não mandar contam como zero
export const toCampaignStatusCounts = (
  response: CampaignStatusCountsResponse,
): CampaignStatusCounts => ({
  [CampaignStatus.DRAFT]: response.DRAFT ?? 0,
  [CampaignStatus.ACTIVE]: response.ACTIVE ?? 0,
  [CampaignStatus.PAUSED]: response.PAUSED ?? 0,
  [CampaignStatus.ARCHIVED]: response.ARCHIVED ?? 0,
});

export const toCampaignCreateRequest = (
  input: CreateCampaignInput,
): CampaignCreateRequest => ({
  name: input.name,
  system: input.system,
  dm_name: input.dmName,
  overview: input.overview,
});

export const toPremadeCharacterCreateRequest = (
  input: CreatePremadeCharacterInput,
): PremadeCharacterCreateRequest => ({
  name: input.name,
});
