import type { GameSystem } from '@/src/modules/rpg/domain';

import type {
  CampaignDetails,
  CampaignStatus,
  CampaignSummary,
} from '../domain';

export interface CreateCampaignInput {
  name: string;
  system: GameSystem;
  overview?: string;
}

/** Porta de saída: o domínio não sabe se os dados vêm de HTTP, cache, etc. */
export interface CampaignRepository {
  list(): Promise<CampaignSummary[]>;
  findById(id: number): Promise<CampaignDetails>;
  resolveSlug(slug: string): Promise<number>;
  create(input: CreateCampaignInput): Promise<void>;
  delete(id: number): Promise<void>;
  updateStatus(id: number, status: CampaignStatus): Promise<CampaignStatus>;
}
