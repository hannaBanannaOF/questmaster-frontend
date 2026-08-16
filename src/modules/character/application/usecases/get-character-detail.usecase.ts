'use server';

import { characterApiRepository } from '../../infra/character.api';
import { CharacterRepository } from '../character.repository';

export const getCharacterDetailUseCase = async (
  id: number,
  repo: CharacterRepository = characterApiRepository,
) => await repo.getCharacterDetail(id);
