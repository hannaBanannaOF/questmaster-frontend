import { getCharacterDetailAPI } from '../infra/character.api';

export async function getCharacterDetailUseCase(id: number) {
  return await getCharacterDetailAPI(id);
}
