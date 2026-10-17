import { describe, expect, it } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';

import { toInvite } from './invite.http-repository';

const response = {
  invite_hash: '9cd949d1-1669-4710-9a4e-f49bd725a161',
  campaign_slug: 'mascaras',
  campaign_name: 'Máscaras',
  campaign_player_count: 0,
  campaign_system: 'CALL_OF_CTHULHU',
  is_dm: false,
};

describe('toInvite', () => {
  it('converte as fichas prontas com o sistema da campanha', () => {
    const invite = toInvite({
      ...response,
      premade_characters: [
        { slug: 'harvey', name: 'Harvey' },
        { slug: 'jenny', name: 'Jenny' },
      ],
    });

    expect(invite.premadeCharacters).toEqual([
      { slug: 'harvey', name: 'Harvey', system: GameSystem.CALL_OF_CTHULHU },
      { slug: 'jenny', name: 'Jenny', system: GameSystem.CALL_OF_CTHULHU },
    ]);
  });

  it('sem fichas prontas, devolve lista vazia', () => {
    expect(toInvite(response).premadeCharacters).toEqual([]);
  });

  it('traz o apelido de quem mestra quando o core manda', () => {
    expect(toInvite({ ...response, dm_name: 'Ana' }).dmName).toBe('Ana');
    expect(toInvite(response).dmName).toBeUndefined();
  });
});
