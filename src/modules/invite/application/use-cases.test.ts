import { describe, expect, it, vi } from 'vitest';

import { NotFoundError } from '@/src/lib/errors';
import { GameSystem } from '@/src/modules/rpg/domain';

import type { Invite } from '../domain';
import type { InviteRepository } from './invite.repository';
import { makeAcceptInvite, makeCreateInvite, makeGetInvite } from './use-cases';

const HASH = '9cd949d1-1669-4710-9a4e-f49bd725a161';

const invite: Invite = {
  hash: HASH,
  campaignSlug: 'mascaras',
  campaignName: 'Máscaras de Nyarlathotep',
  campaignPlayerCount: 3,
  campaignSystem: GameSystem.CALL_OF_CTHULHU,
};

function fakeRepository(
  overrides: Partial<InviteRepository> = {},
): InviteRepository {
  return {
    create: vi.fn().mockResolvedValue(HASH),
    findByHash: vi.fn().mockResolvedValue(invite),
    accept: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('makeCreateInvite', () => {
  it('devolve o hash do convite da campanha', async () => {
    const repository = fakeRepository();

    await expect(makeCreateInvite(repository)(1)).resolves.toBe(HASH);
    expect(repository.create).toHaveBeenCalledWith(1);
  });
});

describe('makeGetInvite', () => {
  it('busca o convite pelo hash', async () => {
    const repository = fakeRepository();

    await expect(makeGetInvite(repository)(HASH)).resolves.toBe(invite);
    expect(repository.findByHash).toHaveBeenCalledWith(HASH);
  });

  it('trata hash malformado como convite inexistente, sem chamar a API', async () => {
    const repository = fakeRepository();

    await expect(
      makeGetInvite(repository)('hash-inventado'),
    ).rejects.toBeInstanceOf(NotFoundError);
    expect(repository.findByHash).not.toHaveBeenCalled();
  });
});

describe('makeAcceptInvite', () => {
  it('aceita com a ficha escolhida e devolve o convite', async () => {
    const repository = fakeRepository();

    await expect(makeAcceptInvite(repository)(HASH, 'harvey')).resolves.toBe(
      invite,
    );
    expect(repository.accept).toHaveBeenCalledWith(HASH, 'harvey');
  });

  it('não aceita um convite que não existe', async () => {
    const repository = fakeRepository({
      findByHash: vi.fn().mockRejectedValue(new NotFoundError('not found')),
    });

    await expect(
      makeAcceptInvite(repository)(HASH, 'harvey'),
    ).rejects.toBeInstanceOf(NotFoundError);
    expect(repository.accept).not.toHaveBeenCalled();
  });

  it('não aceita um hash malformado', async () => {
    const repository = fakeRepository();

    await expect(
      makeAcceptInvite(repository)('nope', 'harvey'),
    ).rejects.toBeInstanceOf(NotFoundError);
    expect(repository.findByHash).not.toHaveBeenCalled();
    expect(repository.accept).not.toHaveBeenCalled();
  });
});
