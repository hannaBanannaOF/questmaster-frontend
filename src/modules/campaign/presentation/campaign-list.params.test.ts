import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '../domain';
import {
  campaignListHref,
  getHiddenBy,
  hasCampaignFilters,
  parseCampaignListParams,
} from './campaign-list.params';

describe('parseCampaignListParams', () => {
  it('lê página, papel e status', () => {
    expect(
      parseCampaignListParams({ page: '2', role: 'dm', status: 'PAUSED' }),
    ).toEqual({ page: 2, role: 'dm', status: CampaignStatus.PAUSED });
  });

  it('sem nada, primeira página e sem filtros', () => {
    expect(parseCampaignListParams({})).toEqual({
      page: 1,
      role: undefined,
      status: undefined,
    });
  });

  it('ignora valores desconhecidos em vez de quebrar', () => {
    expect(
      parseCampaignListParams({ page: 'x', role: 'admin', status: 'paused' }),
    ).toEqual({ page: 1, role: undefined, status: undefined });
  });

  it('lê a busca sem espaços nas pontas; vazia vira sem busca', () => {
    expect(parseCampaignListParams({ q: '  boston ' }).q).toBe('boston');
    expect(parseCampaignListParams({ q: '   ' }).q).toBeUndefined();
  });

  it('corta a busca no limite do core', () => {
    expect(parseCampaignListParams({ q: 'a'.repeat(150) }).q).toHaveLength(100);
  });

  it('usa o primeiro valor quando o parâmetro se repete', () => {
    expect(parseCampaignListParams({ role: ['player', 'dm'] }).role).toBe(
      'player',
    );
  });
});

describe('campaignListHref', () => {
  it('lista sem filtros', () => {
    expect(campaignListHref({})).toBe('/campaigns');
  });

  it('página 1 não vai pra URL', () => {
    expect(campaignListHref({ role: 'dm', page: 1 })).toBe(
      '/campaigns?role=dm',
    );
  });

  it('junta filtros e página', () => {
    expect(
      campaignListHref({ role: 'dm', status: CampaignStatus.PAUSED, page: 2 }),
    ).toBe('/campaigns?role=dm&status=PAUSED&page=2');
  });

  it('ida e volta pela URL dá os mesmos filtros', () => {
    const params = {
      page: 3,
      role: 'player' as const,
      status: CampaignStatus.ACTIVE,
    };
    const query = new URL(campaignListHref(params), 'http://x').searchParams;

    expect(parseCampaignListParams(Object.fromEntries(query))).toEqual(params);
  });
});

describe('hasCampaignFilters', () => {
  it('só papel ou status contam como filtro', () => {
    expect(hasCampaignFilters({ page: 4 })).toBe(false);
    expect(hasCampaignFilters({ page: 1, role: 'dm' })).toBe(true);
    expect(hasCampaignFilters({ page: 1, status: CampaignStatus.DRAFT })).toBe(
      true,
    );
  });
});

describe('campaignListHref · busca', () => {
  it('leva a busca junto dos filtros', () => {
    expect(campaignListHref({ q: 'boston', role: 'dm' })).toBe(
      '/campaigns?q=boston&role=dm',
    );
  });
});

describe('getHiddenBy', () => {
  it('diz se foi a busca, os filtros ou os dois', () => {
    expect(getHiddenBy({ page: 1 })).toBeNull();
    expect(getHiddenBy({ page: 1, q: 'x' })).toBe('search');
    expect(getHiddenBy({ page: 1, role: 'dm' })).toBe('filters');
    expect(
      getHiddenBy({ page: 1, q: 'x', status: CampaignStatus.PAUSED }),
    ).toBe('both');
  });
});
