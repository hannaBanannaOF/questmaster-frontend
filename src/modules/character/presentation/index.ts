// API pública da apresentação (consumida pelas rotas e por outros módulos no servidor)
export { getCharacterBySlug, getCharacters } from './character.loaders';
export * from './character-list.params';
export * from './components/character-card/character-card';
export * from './components/create-character-button/create-character-button';
export * from './views/character-details-view';
export * from './views/character-list-view';
export * from './views/character-not-found-view';
