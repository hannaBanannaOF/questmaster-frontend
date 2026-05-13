import { getCharacterDetailAPI } from '../infra/character.api';

export const getCharacterDetailUseCase = async (id: number) =>
  getCharacterDetailAPI(id);
