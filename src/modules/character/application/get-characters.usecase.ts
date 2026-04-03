import { getCharactersAPI } from '../infra/character.api';

export async function getCharactersUseCase() {
  return await getCharactersAPI();
}
