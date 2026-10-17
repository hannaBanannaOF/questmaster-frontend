import type { ListSort, Page, PageRequest } from '@/src/lib/pagination';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CharacterDetails, CharacterSummary } from '../domain';

export interface CharacterFilters {
  gameSystem?: GameSystem;
  /** Só personagens que ainda não estão em nenhuma campanha. */
  withoutCampaign?: boolean;
  /** Parte do nome; o core ignora até ter a change character-list-search. */
  q?: string;
  sort?: ListSort;
}

export interface CreateCharacterInput {
  name: string;
  system: GameSystem;
}

export interface EditCharacterInput {
  name: string;
}

export interface CharacterRepository {
  list(
    filters: CharacterFilters,
    page: PageRequest,
  ): Promise<Page<CharacterSummary>>;
  findById(id: number): Promise<CharacterDetails>;
  resolveSlug(slug: string): Promise<number>;
  /** Devolve o slug da ficha nova. */
  create(input: CreateCharacterInput): Promise<string>;
  delete(id: number): Promise<void>;
  /** Renomeia; devolve o slug, que acompanha o nome. */
  edit(id: number, input: EditCharacterInput): Promise<string>;
}
