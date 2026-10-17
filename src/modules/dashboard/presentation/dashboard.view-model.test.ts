import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '@/src/modules/campaign/domain';
import { aCampaign, aCharacter } from '@/src/test/fixtures';

import {
  buildDashboardViewModel,
  type DashboardCampaigns,
  type DashboardData,
} from './dashboard.view-model';

const page = <T>(items: T[], total = items.length) => ({ items, total });

const innsmouth = aCampaign({
  slug: 'innsmouth',
  isDm: false,
  status: CampaignStatus.ACTIVE,
  playerCount: 3,
});
const kingsport = aCampaign({ slug: 'kingsport', isDm: false, playerCount: 2 });
const boston = aCampaign({ slug: 'boston', playerCount: 3 });
const arkham = aCampaign({ slug: 'arkham', playerCount: 0 });

const campaigns = (data: Partial<DashboardCampaigns> = {}) =>
  ({
    ok: true,
    data: {
      dm: page([]),
      dmWithoutPlayers: page([]),
      player: page([]),
      ...data,
    },
  }) as const;
const characters = (count: number) =>
  ({
    ok: true,
    data: page(
      Array.from({ length: count }, (_, i) => aCharacter({ slug: `c${i}` })),
    ),
  }) as const;
const failed = { ok: false } as const;

const build = (data: DashboardData, view?: string) =>
  buildDashboardViewModel(data, view);

describe('buildDashboardViewModel', () => {
  it('as duas buscas falharam: indisponível', () => {
    expect(build({ campaigns: failed, characters: failed })).toEqual({
      kind: 'unavailable',
    });
  });

  it('conta nova: boas-vindas', () => {
    expect(
      build({ campaigns: campaigns(), characters: characters(0) }),
    ).toEqual({ kind: 'welcome' });
  });

  it('falha não é conta vazia', () => {
    expect(build({ campaigns: failed, characters: characters(0) }).kind).toBe(
      'board',
    );
    expect(build({ campaigns: campaigns(), characters: failed }).kind).toBe(
      'board',
    );
  });

  it('só joga: sem abas, convite para mestrar', () => {
    const vm = build({
      campaigns: campaigns({ player: page([kingsport]) }),
      characters: characters(2),
    });
    expect(vm).toMatchObject({ kind: 'board', tabs: false, nudge: 'dm' });
  });

  it('só mestra: sem abas, abre Mestrando e convida a jogar, mesmo com ?view=player', () => {
    const vm = build(
      {
        campaigns: campaigns({ dm: page([boston]) }),
        characters: characters(0),
      },
      'player',
    );
    expect(vm).toMatchObject({
      tabs: false,
      nudge: 'player',
      panel: { tab: 'dm' },
    });
  });

  it('joga e mestra: abas, Jogando por padrão e a URL escolhe', () => {
    const data = {
      campaigns: campaigns({ dm: page([boston]), player: page([kingsport]) }),
      characters: characters(1),
    };
    expect(build(data)).toMatchObject({
      tabs: true,
      nudge: null,
      panel: { tab: 'player' },
    });
    expect(build(data, 'dm')).toMatchObject({ panel: { tab: 'dm' } });
  });

  it('campanhas falharam: mantém as abas e Jogando sem destaque', () => {
    const vm = build({ campaigns: failed, characters: characters(2) });
    expect(vm).toMatchObject({
      tabs: true,
      panel: {
        tab: 'player',
        hero: null,
        campaigns: { ok: false },
        characters: { ok: true, total: 2 },
      },
    });
  });

  it('campanhas falharam na aba Mestrando: painel com erro', () => {
    const vm = build({ campaigns: failed, characters: characters(1) }, 'dm');
    expect(vm).toMatchObject({ panel: { tab: 'dm', ok: false } });
  });

  it('personagens falharam com campanhas de mestre: mantém as abas', () => {
    const vm = build({
      campaigns: campaigns({ dm: page([boston]) }),
      characters: failed,
    });
    expect(vm).toMatchObject({ tabs: true, panel: { tab: 'dm' } });
  });

  it('continuar jogando sai da lista de campanhas, o total não muda', () => {
    const vm = build({
      campaigns: campaigns({
        player: page([innsmouth, kingsport]),
        playerContinue: innsmouth,
      }),
      characters: characters(2),
    });
    expect(vm).toMatchObject({
      panel: {
        hero: { kind: 'continue', campaign: innsmouth },
        campaigns: { ok: true, items: [kingsport], total: 2 },
      },
    });
  });

  it('fichas sem campanha: Pronto para a aventura e sem seção de campanhas', () => {
    const vm = build({ campaigns: campaigns(), characters: characters(3) });
    expect(vm).toMatchObject({
      panel: { tab: 'player', hero: { kind: 'ready' }, campaigns: null },
    });
  });

  it('mestre: campanha sem jogadores aparece só em "Precisa de você"', () => {
    const active = aCampaign({
      slug: 'nyarlathotep',
      status: CampaignStatus.ACTIVE,
      playerCount: 4,
    });
    const vm = build({
      campaigns: campaigns({
        dm: page([active, boston, arkham], 7),
        dmWithoutPlayers: page([arkham], 3),
        dmContinue: active,
      }),
      characters: characters(0),
    });
    expect(vm).toMatchObject({
      panel: {
        tab: 'dm',
        ok: true,
        hero: active,
        campaigns: { items: [boston], total: 7 },
        needsYou: { items: [arkham], total: 3 },
      },
    });
  });
});
