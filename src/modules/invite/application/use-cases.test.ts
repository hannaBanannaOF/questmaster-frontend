import { describe, expect, it, vi } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';

import type { Invite } from '../domain';
import type { InviteRepository } from './invite.repository';
import { makeAcceptInvite, makeCreateInvite, makeGetInvite } from './use-cases';

const invite: Invite = {
  hash: 'abc123',
  campaignSlug: 'mascaras',
  campaignName: 'Máscaras de Nyarlathotep',
  campaignPlayerCount: 3,
  campaignSystem: GameSystem.CALL_OF_CTHULHU,
};

function fakeRepository(
  overrides: Partial<InviteRepository> = {},
): InviteRepository {
  return {
    create: vi.fn().mockResolvedValue('abc123'),
    findByHash: vi.fn().mockResolvedValue(invite),
    accept: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('makeCreateInvite', () => {
  it('devolve o hash do convite da campanha', async () => {
    const repository = fakeRepository();

    await expect(makeCreateInvite(repository)(1)).resolves.toBe('abc123');
    expect(repository.create).toHaveBeenCalledWith(1);
  });
});

describe('makeGetInvite', () => {
  it('busca o convite pelo hash', async () => {
    await expect(makeGetInvite(fakeRepository())('abc123')).resolves.toBe(
      invite,
    );
  });
});

describe('makeAcceptInvite', () => {
  it('aceita com a ficha escolhida e devolve o convite', async () => {
    const repository = fakeRepository();

    await expect(
      makeAcceptInvite(repository)('abc123', 'harvey'),
    ).resolves.toBe(invite);
    expect(repository.accept).toHaveBeenCalledWith('abc123', 'harvey');
  });

  it('não aceita um convite que não existe', async () => {
    const repository = fakeRepository({
      findByHash: vi.fn().mockRejectedValue(new Error('not found')),
    });

    await expect(
      makeAcceptInvite(repository)('nope', 'harvey'),
    ).rejects.toThrow('not found');
    expect(repository.accept).not.toHaveBeenCalled();
  });
});
