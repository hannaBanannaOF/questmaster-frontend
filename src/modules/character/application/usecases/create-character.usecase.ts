'use server';

import { characterApiRepository } from '../../infra/character.api';
import {
  CharacterRepository,
  CreateCharacterInput,
} from '../character.repository';

export const createCharacterUseCase = async (
  data: CreateCharacterInput,
  repo: CharacterRepository = characterApiRepository,
) => await repo.createCharacter(data);
