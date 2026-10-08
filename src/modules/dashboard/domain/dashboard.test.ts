import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '@/src/modules/campaign/domain';
import { aCampaign, aCharacter } from '@/src/test/fixtures';

import {
  countCampaignsByStatus,
  hasPlayerRole,
  isDashboardTab,
  pickContinueCampaign,
  resolveDashboardTab,
  sortDmCampaigns,
  splitCampaignsByRole,
} from './dashboard';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

describe('isDashboardTab', () => {
  it('aceita só as abas existentes', () => {
    expect(isDashboardTab('player')).toBe(true);
    expect(isDashboardTab('dm')).toBe(true);
    expect(isDashboardTab('DM')).toBe(false);
    expect(isDashboardTab(undefined)).toBe(false);
  });
});

describe('splitCampaignsByRole', () => {
  it('separa as campanhas que o usuário mestra das que joga', () => {
    const mine = aCampaign({ slug: 'mine', isDm: true });
    const theirs = aCampaign({ slug: 'theirs', isDm: false });

    expect(splitCampaignsByRole([mine, theirs])).toEqual({
      dm: [mine],
      player: [theirs],
    });
  });

  it('lida com lista vazia', () => {
    expect(splitCampaignsByRole([])).toEqual({ dm: [], player: [] });
  });
});

describe('hasPlayerRole', () => {
  it('joga quem tem ficha', () => {
    expect(hasPlayerRole([aCharacter()], [])).toBe(true);
  });

  it('joga quem está numa campanha de outro mestre', () => {
    expect(hasPlayerRole([], [aCampaign({ isDm: false })])).toBe(true);
  });

  it('não joga sem ficha nem campanha', () => {
    expect(hasPlayerRole([], [])).toBe(false);
  });
});

describe('resolveDashboardTab', () => {
  const both = { hasPlayer: true, hasDm: true };
  const onlyDm = { hasPlayer: false, hasDm: true };
  const none = { hasPlayer: false, hasDm: false };

  it('a aba da URL vence, mesmo vazia', () => {
    expect(resolveDashboardTab('dm', none)).toBe('dm');
    expect(resolveDashboardTab('player', onlyDm)).toBe('player');
  });

  it('sem aba na URL, abre Jogando', () => {
    expect(resolveDashboardTab(undefined, both)).toBe('player');
    expect(resolveDashboardTab(undefined, none)).toBe('player');
  });

  it('sem aba na URL, abre Mestrando quando o usuário só mestra', () => {
    expect(resolveDashboardTab(undefined, onlyDm)).toBe('dm');
  });

  it('ignora valor inválido na URL', () => {
    expect(resolveDashboardTab('admin', onlyDm)).toBe('dm');
  });
});

describe('pickContinueCampaign', () => {
  it('escolhe a primeira campanha em andamento', () => {
    const paused = aCampaign({ slug: 'paused', status: PAUSED });
    const first = aCampaign({ slug: 'first', status: ACTIVE });
    const second = aCampaign({ slug: 'second', status: ACTIVE });

    expect(pickContinueCampaign([paused, first, second])).toBe(first);
  });

  it('não escolhe nada sem campanha em andamento', () => {
    expect(
      pickContinueCampaign([aCampaign({ status: DRAFT })]),
    ).toBeUndefined();
  });
});

describe('sortDmCampaigns', () => {
  it('ordena por Jogando, Rascunho, Pausada e Arquivada', () => {
    const campaigns = [ARCHIVED, PAUSED, DRAFT, ACTIVE].map((status) =>
      aCampaign({ slug: status, status }),
    );

    expect(sortDmCampaigns(campaigns).map((c) => c.status)).toEqual([
      ACTIVE,
      DRAFT,
      PAUSED,
      ARCHIVED,
    ]);
  });

  it('mantém a ordem original dentro do mesmo status', () => {
    const a = aCampaign({ slug: 'a', status: ACTIVE });
    const b = aCampaign({ slug: 'b', status: ACTIVE });

    expect(sortDmCampaigns([b, a])).toEqual([b, a]);
  });

  it('não altera a lista recebida', () => {
    const campaigns = [
      aCampaign({ status: ARCHIVED }),
      aCampaign({ status: ACTIVE }),
    ];
    const copy = [...campaigns];

    sortDmCampaigns(campaigns);

    expect(campaigns).toEqual(copy);
  });
});

describe('countCampaignsByStatus', () => {
  it('conta cada status, incluindo os zerados, na ordem do mestre', () => {
    const campaigns = [ACTIVE, ACTIVE, ARCHIVED].map((status) =>
      aCampaign({ status }),
    );

    expect(countCampaignsByStatus(campaigns)).toEqual([
      { status: ACTIVE, count: 2 },
      { status: DRAFT, count: 0 },
      { status: PAUSED, count: 0 },
      { status: ARCHIVED, count: 1 },
    ]);
  });
});
