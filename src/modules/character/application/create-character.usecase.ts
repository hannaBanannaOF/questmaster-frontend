import { CharacterCreateFormData } from '../domain/character.schema';
import { createCreateAPI } from '../infra/character.api';

export async function createCharacterUseCase(data: CharacterCreateFormData) {
  await createCreateAPI(data);
}