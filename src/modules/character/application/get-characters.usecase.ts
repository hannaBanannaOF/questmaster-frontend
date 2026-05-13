import { getCharactersAPI } from '../infra/character.api';

export const getCharactersUseCase = async () => getCharactersAPI();
