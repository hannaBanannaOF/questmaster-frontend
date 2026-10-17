import { describe, expect, it } from 'vitest';

import {
  characterListHref,
  parseCharacterListParams,
} from './character-list.params';

describe('parseCharacterListParams', () => {
  it('lê página e filtro', () => {
    expect(
      parseCharacterListParams({ page: '6', without_campaign: 'true' }),
    ).toEqual({ page: 6, withoutCampaign: true });
  });

  it('lê a busca sem espaços; vazia vira sem busca', () => {
    expect(parseCharacterListParams({ q: ' eleanor ' }).q).toBe('eleanor');
    expect(parseCharacterListParams({ q: '  ' }).q).toBeUndefined();
  });

  it('só "true" liga o filtro', () => {
    expect(parseCharacterListParams({ without_campaign: '1' })).toEqual({
      page: 1,
      withoutCampaign: false,
    });
  });
});

describe('characterListHref', () => {
  it('lista sem filtro na primeira página', () => {
    expect(characterListHref({ page: 1, withoutCampaign: false })).toBe(
      '/characters',
    );
  });

  it('leva a busca junto do filtro', () => {
    expect(characterListHref({ q: 'jack', withoutCampaign: true })).toBe(
      '/characters?q=jack&without_campaign=true',
    );
  });

  it('junta filtro e página', () => {
    expect(characterListHref({ page: 2, withoutCampaign: true })).toBe(
      '/characters?without_campaign=true&page=2',
    );
  });
});
