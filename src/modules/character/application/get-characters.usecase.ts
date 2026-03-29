import { getCharacters } from '../infra/character.api';

export async function getCharactersUseCase() {
  return await getCharacters();
}
