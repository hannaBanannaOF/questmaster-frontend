import { updateCharacterHpAPI } from '../infra/character.api';

export async function updateCharacterHpUseCase(newHp: number, id: number) {
  return updateCharacterHpAPI(newHp, id);
}