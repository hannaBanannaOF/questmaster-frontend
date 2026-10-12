import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';
import { GameSystem } from '@/src/modules/rpg/domain';

import {
  campaignCreateSchema,
  premadeCharacterSchema,
} from './campaign.schema';

const key = (path: string) => `campaign.create.form.${path}`;

describe('campaignCreateSchema', () => {
  it('aceita uma campanha válida e descarta a descrição vazia', async () => {
    await expect(
      validate(campaignCreateSchema, {
        name: ' Máscaras ',
        system: GameSystem.CALL_OF_CTHULHU,
        overview: '   ',
      }),
    ).resolves.toEqual({
      ok: true,
      data: { name: 'Máscaras', system: GameSystem.CALL_OF_CTHULHU },
    });
  });

  it('mantém a descrição preenchida', async () => {
    const result = await validate(campaignCreateSchema, {
      name: 'Máscaras',
      system: GameSystem.CALL_OF_CTHULHU,
      overview: ' Nova York, 1925. ',
    });

    expect(result).toMatchObject({
      ok: true,
      data: { overview: 'Nova York, 1925.' },
    });
  });

  it('exige nome e sistema', async () => {
    await expect(validate(campaignCreateSchema, {})).resolves.toEqual({
      ok: false,
      fieldErrors: {
        name: key('name.errors.required'),
        system: key('game_system.errors.required'),
      },
    });
  });
});

describe('premadeCharacterSchema', () => {
  const premade = (path: string) => `campaign.premade.form.${path}`;

  it('aceita nome com PV máximo e sem PV', async () => {
    await expect(
      validate(premadeCharacterSchema, { name: ' Harvey ', maxHp: '12' }),
    ).resolves.toEqual({ ok: true, data: { name: 'Harvey', maxHp: 12 } });
    await expect(
      validate(premadeCharacterSchema, { name: 'Harvey', maxHp: ' ' }),
    ).resolves.toEqual({ ok: true, data: { name: 'Harvey' } });
  });

  it('exige nome e PV inteiro positivo', async () => {
    await expect(
      validate(premadeCharacterSchema, { name: ' ', maxHp: '0' }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: {
        name: premade('name.errors.required'),
        maxHp: premade('maxHp.errors.min'),
      },
    });
    await expect(
      validate(premadeCharacterSchema, { name: 'Harvey', maxHp: 'abc' }),
    ).resolves.toMatchObject({
      fieldErrors: { maxHp: premade('maxHp.errors.type') },
    });
  });
});
