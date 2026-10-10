import type { Page, PageRequest } from '@/src/lib/pagination';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type {
  CampaignDetails,
  CampaignRole,
  CampaignStatus,
  CampaignStatusCounts,
  CampaignSummary,
} from '../domain';

export interface CreateCampaignInput {
  name: string;
  system: GameSystem;
  overview?: string;
}

export interface CampaignListFilters {
  role?: CampaignRole;
  status?: CampaignStatus;
}

/** Porta de saída: o domínio não sabe se os dados vêm de HTTP, cache, etc. */
export interface CampaignRepository {
  list(
    filters: CampaignListFilters,
    page: PageRequest,
  ): Promise<Page<CampaignSummary>>;
  countByStatus(role?: CampaignRole): Promise<CampaignStatusCounts>;
  findById(id: number): Promise<CampaignDetails>;
  resolveSlug(slug: string): Promise<number>;
  create(input: CreateCampaignInput): Promise<void>;
  delete(id: number): Promise<void>;
  updateStatus(id: number, status: CampaignStatus): Promise<CampaignStatus>;
}
