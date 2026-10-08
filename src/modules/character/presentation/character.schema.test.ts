import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';
import { GameSystem } from '@/src/modules/rpg/domain';

import { characterCreateSchema } from './character.schema';

const key = (path: string) => `character.create.form.${path}`;

describe('characterCreateSchema', () => {
  it('aceita um personagem válido e converte o PV', async () => {
    await expect(
      validate(characterCreateSchema, {
        name: '  Harvey  ',
        hp: '12',
        system: GameSystem.CALL_OF_CTHULHU,
      }),
    ).resolves.toEqual({
      ok: true,
      data: { name: 'Harvey', hp: 12, system: GameSystem.CALL_OF_CTHULHU },
    });
  });

  it('aponta todos os campos inválidos de uma vez', async () => {
    await expect(
      validate(characterCreateSchema, { name: '   ', hp: '0', system: '' }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: {
        name: key('name.errors.required'),
        hp: key('hp.errors.min'),
        system: key('game_system.errors.required'),
      },
    });
  });

  it.each([
    ['abc', 'hp.errors.type'],
    ['1.5', 'hp.errors.type'],
    ['', 'hp.errors.required'],
    ['   ', 'hp.errors.required'],
    [undefined, 'hp.errors.required'],
  ])('recusa PV %j', async (hp, error) => {
    const result = await validate(characterCreateSchema, {
      name: 'Harvey',
      hp,
      system: GameSystem.CALL_OF_CTHULHU,
    });

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: { hp: key(error) },
    });
  });

  it('limita o nome a 255 caracteres', async () => {
    const result = await validate(characterCreateSchema, {
      name: 'a'.repeat(256),
      hp: '12',
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
      hp: '12',
      system: 'DND',
    });

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: { system: key('game_system.errors.required') },
    });
  });
});
