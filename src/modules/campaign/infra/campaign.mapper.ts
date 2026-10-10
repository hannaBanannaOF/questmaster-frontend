import type { PageRequest } from '@/src/lib/pagination';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CampaignListFilters, CreateCampaignInput } from '../application';
import {
  type CampaignDetails,
  CampaignStatus,
  type CampaignStatusCounts,
  type CampaignSummary,
} from '../domain';
import type {
  CampaignCreateRequest,
  CampaignDetailsResponse,
  CampaignListQuery,
  CampaignListResponse,
  CampaignStatusCountsResponse,
} from './campaign.dto';

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
  characters: response.characters.map(({ id, name }) => ({ id, name })),
  playerCount: response.characters.length,
  inviteHash: response.invite_hash,
});

export const toCampaignListQuery = (
  filters: CampaignListFilters,
  page: PageRequest,
): CampaignListQuery => ({
  role: filters.role,
  status: filters.status,
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
  overview: input.overview,
});
