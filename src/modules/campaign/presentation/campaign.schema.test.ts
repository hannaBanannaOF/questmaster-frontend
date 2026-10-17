import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';
import { GameSystem } from '@/src/modules/rpg/domain';

import {
  campaignCreateSchema,
  premadeCharacterSchema,
  tableNameSchema,
} from './campaign.schema';

const key = (path: string) => `campaign.create.form.${path}`;

describe('campaignCreateSchema', () => {
  it('aceita uma campanha válida e descarta a descrição vazia', async () => {
    await expect(
      validate(campaignCreateSchema, {
        name: ' Máscaras ',
        system: GameSystem.CALL_OF_CTHULHU,
        dmName: ' Hanna ',
        overview: '   ',
      }),
    ).resolves.toEqual({
      ok: true,
      data: {
        name: 'Máscaras',
        system: GameSystem.CALL_OF_CTHULHU,
        dmName: 'Hanna',
      },
    });
  });

  it('mantém a descrição preenchida', async () => {
    const result = await validate(campaignCreateSchema, {
      name: 'Máscaras',
      system: GameSystem.CALL_OF_CTHULHU,
      dmName: 'Hanna',
      overview: ' Nova York, 1925. ',
    });

    expect(result).toMatchObject({
      ok: true,
      data: { overview: 'Nova York, 1925.' },
    });
  });

  it('exige nome, sistema e apelido', async () => {
    await expect(validate(campaignCreateSchema, {})).resolves.toEqual({
      ok: false,
      fieldErrors: {
        name: key('name.errors.required'),
        system: key('game_system.errors.required'),
        dmName: key('dm_name.errors.required'),
      },
    });
  });
});

describe('premadeCharacterSchema', () => {
  const premade = (path: string) => `campaign.premade.form.${path}`;

  it('aceita só o nome', async () => {
    await expect(
      validate(premadeCharacterSchema, { name: ' Harvey ' }),
    ).resolves.toEqual({ ok: true, data: { name: 'Harvey' } });
  });

  it('exige nome', async () => {
    await expect(
      validate(premadeCharacterSchema, { name: ' ' }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: { name: premade('name.errors.required') },
    });
  });
});

describe('tableNameSchema', () => {
  it('apara o apelido e limita a 50 caracteres', async () => {
    await expect(
      validate(tableNameSchema, { name: ' Lena ' }),
    ).resolves.toEqual({ ok: true, data: { name: 'Lena' } });
    await expect(
      validate(tableNameSchema, { name: 'a'.repeat(51) }),
    ).resolves.toEqual({
      ok: false,
      fieldErrors: { name: 'campaign.tableName.form.errors.max' },
    });
  });

  it('recusa apelido vazio', async () => {
    await expect(validate(tableNameSchema, { name: '  ' })).resolves.toEqual({
      ok: false,
      fieldErrors: { name: 'campaign.tableName.form.errors.required' },
    });
  });
});
