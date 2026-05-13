import { updateCharacterHpAPI } from '../infra/character.api';

export const updateCharacterHpUseCase = async (newHp: number, id: number) =>
  updateCharacterHpAPI(newHp, id);
