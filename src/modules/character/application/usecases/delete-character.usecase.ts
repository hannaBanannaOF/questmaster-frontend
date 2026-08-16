'use server';

import { characterApiRepository } from '../../infra/character.api';
import { CharacterRepository } from '../character.repository';

export const deleteCharacterUseCase = async (
  id: number,
  repo: CharacterRepository = characterApiRepository,
) => await repo.deleteCharacter(id);
