import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '../domain';
import {
  campaignListHref,
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
