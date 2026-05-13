import { CharacterCreateFormData } from '../domain/character.schema';
import { createCharacterAPI } from '../infra/character.api';

export const createCharacterUseCase = (data: CharacterCreateFormData) =>
  createCharacterAPI(data);
