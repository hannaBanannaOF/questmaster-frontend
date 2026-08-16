'use server';

import { characterApiRepository } from '../../infra/character.api';
import { CharacterListFilters } from '../../infra/dto.types';
import { CharacterRepository } from '../character.repository';

export const getCharactersUseCase = async (
  filters?: CharacterListFilters,
  repo: CharacterRepository = characterApiRepository,
) => await repo.getCharacters(filters);
