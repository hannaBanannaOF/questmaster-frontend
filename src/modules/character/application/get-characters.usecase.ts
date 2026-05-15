import { getCharactersAPI } from '../infra/character.api';
import { CharacterListFilters } from '../infra/dto.types';

export const getCharactersUseCase = async (filters?: CharacterListFilters) =>
  getCharactersAPI(filters);
