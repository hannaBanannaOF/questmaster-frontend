import type { ListSort, Page, PageRequest } from '@/src/lib/pagination';
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
  /** Como o mestre aparece nesta campanha. */
  dmName: string;
  overview?: string;
}

export interface CreatePremadeCharacterInput {
  name: string;
}

export interface CampaignListFilters {
  role?: CampaignRole;
  status?: CampaignStatus;
  /** Parte do nome. */
  q?: string;
  /** Só campanhas em que ninguém entrou. */
  withoutPlayers?: boolean;
  sort?: ListSort;
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
  /** Devolve o slug da campanha nova. */
  create(input: CreateCampaignInput): Promise<string>;
  delete(id: number): Promise<void>;
  updateStatus(id: number, status: CampaignStatus): Promise<CampaignStatus>;
  /** Muda o apelido de quem pede (mestre ou jogador) nesta campanha. */
  updateTableName(id: number, name: string): Promise<string>;
  /** Cria uma ficha sem jogador na campanha (só o mestre). */
  createPremadeCharacter(
    campaignId: number,
    input: CreatePremadeCharacterInput,
  ): Promise<void>;
  deletePremadeCharacter(characterId: number): Promise<void>;
  /** Tira a ficha da campanha; ela continua com o jogador. */
  removeCharacter(campaignId: number, characterId: number): Promise<void>;
}
