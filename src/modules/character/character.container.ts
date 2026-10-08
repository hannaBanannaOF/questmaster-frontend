import 'server-only';

import { createHttpClient, Microservice } from '@/src/lib/http';

import {
  makeCreateCharacter,
  makeDeleteCharacter,
  makeGetCharacterBySlug,
  makeListCharacters,
  makeUpdateCharacterHp,
} from './application';
import { createCharacterHttpRepository } from './infra/character.http-repository';

// Composition root: liga os use cases às implementações de infra
const characters = createCharacterHttpRepository(
  createHttpClient(Microservice.Core),
);

export const characterUseCases = {
  listCharacters: makeListCharacters(characters),
  getCharacterBySlug: makeGetCharacterBySlug(characters),
  createCharacter: makeCreateCharacter(characters),
  deleteCharacter: makeDeleteCharacter(characters),
  updateCharacterHp: makeUpdateCharacterHp(characters),
};
