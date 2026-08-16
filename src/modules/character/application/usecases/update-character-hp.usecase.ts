'use server';

import { characterApiRepository } from '../../infra/character.api';
import { CharacterRepository } from '../character.repository';

export const updateCharacterHpUseCase = async (
  id: number,
  newHp: number,
  repo: CharacterRepository = characterApiRepository,
) => await repo.updateCharacterHp(id, newHp);
