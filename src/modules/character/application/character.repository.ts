import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CharacterDetails, CharacterSummary } from '../domain';

export interface CharacterFilters {
  gameSystem?: GameSystem;
  /** Só personagens que ainda não estão em nenhuma campanha. */
  withoutCampaign?: boolean;
}

export interface CreateCharacterInput {
  name: string;
  hp: number;
  system: GameSystem;
}

export interface CharacterRepository {
  list(filters?: CharacterFilters): Promise<CharacterSummary[]>;
  findById(id: number): Promise<CharacterDetails>;
  resolveSlug(slug: string): Promise<number>;
  create(input: CreateCharacterInput): Promise<void>;
  delete(id: number): Promise<void>;
  updateHp(id: number, hp: number): Promise<number>;
}
