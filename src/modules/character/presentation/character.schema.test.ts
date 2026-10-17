import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';
import { GameSystem } from '@/src/modules/rpg/domain';

import { characterCreateSchema, characterEditSchema } from './character.schema';

const key = (path: string) => `character.create.form.${path}`;

describe('characterCreateSchema', () => {
  it('aceita um personagem válido, sem PV', async () => {
    await expect(
      validate(characterCreateSchema, {
        name: '  Harvey  ',
        system: GameSystem.CALL_OF_CTHULHU,
      }),
    ).resolves.toEqual({
      ok: true,
      data: { name: 'Harvey', system: GameSystem.CALL_OF_CTHULHU },
    });
  });

  it('aponta todos os campos inválidos de uma vez', async () => {
    await expect(
      validate(characterCreateSchema, { name: '   ', system: '' }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: {
        name: key('name.errors.required'),
        system: key('game_system.errors.required'),
      },
    });
  });

  it('limita o nome a 255 caracteres', async () => {
    const result = await validate(characterCreateSchema, {
      name: 'a'.repeat(256),
      system: GameSystem.CALL_OF_CTHULHU,
    });

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: { name: key('name.errors.max') },
    });
  });

  it('recusa sistema desconhecido', async () => {
    const result = await validate(characterCreateSchema, {
      name: 'Harvey',
      system: 'DND',
    });

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: { system: key('game_system.errors.required') },
    });
  });
});

describe('characterEditSchema', () => {
  const key = (path: string) => `character.edit.form.${path}`;

  it('aceita só o nome, aparado', async () => {
    await expect(
      validate(characterEditSchema, { name: ' Jão ' }),
    ).resolves.toEqual({ ok: true, data: { name: 'Jão' } });
  });

  it('exige nome', async () => {
    await expect(validate(characterEditSchema, { name: '' })).resolves.toEqual({
      ok: false,
      fieldErrors: { name: key('name.errors.required') },
    });
  });
});
