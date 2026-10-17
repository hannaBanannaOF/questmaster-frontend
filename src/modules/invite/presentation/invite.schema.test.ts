import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';

import { acceptInviteSchema } from './invite.schema';

describe('acceptInviteSchema', () => {
  it('aceita ficha e apelido, aparando o apelido', async () => {
    await expect(
      validate(acceptInviteSchema, {
        character: 'jack',
        playerName: ' Hanna ',
      }),
    ).resolves.toEqual({
      ok: true,
      data: { character: 'jack', playerName: 'Hanna' },
    });
  });

  it('aponta ficha e apelido faltando de uma vez', async () => {
    await expect(
      validate(acceptInviteSchema, { character: '', playerName: '  ' }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: {
        character: 'invite.character.required',
        playerName: 'invite.playerName.errors.required',
      },
    });
  });

  it('limita o apelido a 50 caracteres', async () => {
    await expect(
      validate(acceptInviteSchema, {
        character: 'jack',
        playerName: 'a'.repeat(51),
      }),
    ).resolves.toMatchObject({
      fieldErrors: { playerName: 'invite.playerName.errors.max' },
    });
  });
});
