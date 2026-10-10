import { describe, expect, it, vi } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { aCampaign, aCampaignDetails } from '@/src/test/fixtures';

import {
  CampaignNotDeletableError,
  CampaignStatus,
  InvalidStatusTransitionError,
} from '../domain';
import type { CampaignRepository } from './campaign.repository';
import {
  makeCountCampaignsByStatus,
  makeCreateCampaign,
  makeDeleteCampaign,
  makeGetCampaignBySlug,
  makeListCampaigns,
  makeUpdateCampaignStatus,
} from './use-cases';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

function fakeRepository(
  overrides: Partial<CampaignRepository> = {},
): CampaignRepository {
  return {
    list: vi.fn().mockResolvedValue({ items: [], total: 0 }),
    countByStatus: vi.fn().mockResolvedValue({
      DRAFT: 0,
      ACTIVE: 0,
      PAUSED: 0,
      ARCHIVED: 0,
    }),
    findById: vi.fn().mockResolvedValue(aCampaignDetails()),
    resolveSlug: vi.fn().mockResolvedValue(1),
    create: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    updateStatus: vi.fn(async (_id, status) => status),
    ...overrides,
  };
}

describe('makeListCampaigns', () => {
  it('repassa filtros e página e devolve a página do repositório', async () => {
    const page = { items: [aCampaign()], total: 11 };
    const repository = fakeRepository({
      list: vi.fn().mockResolvedValue(page),
    });
    const filters = { role: 'dm' as const, status: ACTIVE };
    const request = { limit: 10, offset: 10 };

    await expect(makeListCampaigns(repository)(filters, request)).resolves.toBe(
      page,
    );
    expect(repository.list).toHaveBeenCalledWith(filters, request);
  });
});

describe('makeCountCampaignsByStatus', () => {
  it('conta pelo papel pedido', async () => {
    const repository = fakeRepository();

    await makeCountCampaignsByStatus(repository)('player');

    expect(repository.countByStatus).toHaveBeenCalledWith('player');
  });
});

describe('makeGetCampaignBySlug', () => {
  it('resolve o slug e busca pelo id', async () => {
    const details = aCampaignDetails({ id: 42 });
    const repository = fakeRepository({
      resolveSlug: vi.fn().mockResolvedValue(42),
      findById: vi.fn().mockResolvedValue(details),
    });

    await expect(makeGetCampaignBySlug(repository)('slug')).resolves.toBe(
      details,
    );
    expect(repository.resolveSlug).toHaveBeenCalledWith('slug');
    expect(repository.findById).toHaveBeenCalledWith(42);
  });
});

describe('makeCreateCampaign', () => {
  it('repassa o input ao repositório', async () => {
    const repository = fakeRepository();
    const input = { name: 'Nova', system: GameSystem.CALL_OF_CTHULHU };

    await makeCreateCampaign(repository)(input);

    expect(repository.create).toHaveBeenCalledWith(input);
  });
});

describe('makeDeleteCampaign', () => {
  it.each([DRAFT, ARCHIVED])('DM exclui campanha em %s', async (status) => {
    const campaign = aCampaignDetails({ status, isDm: true });
    const repository = fakeRepository({
      findById: vi.fn().mockResolvedValue(campaign),
    });

    await expect(makeDeleteCampaign(repository)(1)).resolves.toBe(campaign);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it.each([ACTIVE, PAUSED])('recusa excluir campanha em %s', async (status) => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCampaignDetails({ status, isDm: true })),
    });

    await expect(makeDeleteCampaign(repository)(1)).rejects.toBeInstanceOf(
      CampaignNotDeletableError,
    );
    expect(repository.delete).not.toHaveBeenCalled();
  });

  it('recusa quando o usuário não é o DM', async () => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCampaignDetails({ status: DRAFT, isDm: false })),
    });

    await expect(makeDeleteCampaign(repository)(1)).rejects.toBeInstanceOf(
      CampaignNotDeletableError,
    );
    expect(repository.delete).not.toHaveBeenCalled();
  });
});

describe('makeUpdateCampaignStatus', () => {
  it('aplica uma transição permitida', async () => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCampaignDetails({ status: DRAFT, isDm: true })),
    });

    await expect(makeUpdateCampaignStatus(repository)(1, ACTIVE)).resolves.toBe(
      ACTIVE,
    );
    expect(repository.updateStatus).toHaveBeenCalledWith(1, ACTIVE);
  });

  it('recusa uma transição inválida', async () => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCampaignDetails({ status: ARCHIVED, isDm: true })),
    });

    await expect(
      makeUpdateCampaignStatus(repository)(1, ACTIVE),
    ).rejects.toBeInstanceOf(InvalidStatusTransitionError);
    expect(repository.updateStatus).not.toHaveBeenCalled();
  });

  it('recusa quando o usuário não é o DM', async () => {
    const repository = fakeRepository({
      findById: vi
        .fn()
        .mockResolvedValue(aCampaignDetails({ status: DRAFT, isDm: false })),
    });

    await expect(
      makeUpdateCampaignStatus(repository)(1, ACTIVE),
    ).rejects.toBeInstanceOf(InvalidStatusTransitionError);
    expect(repository.updateStatus).not.toHaveBeenCalled();
  });
});
