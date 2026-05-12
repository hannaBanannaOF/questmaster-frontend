import { deleteCharacterAPI } from '../infra/character.api';

export async function deleteCharacterUseCase(id: number) {
  await deleteCharacterAPI(id);
}