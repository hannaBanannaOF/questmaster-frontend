import { deleteCharacterAPI } from '../infra/character.api';

export const deleteCharacterUseCase = async (id: number) =>
  deleteCharacterAPI(id);
