import { describe, expect, it } from 'vitest';

import { validate } from '@/src/lib/actions/validation';
import { GameSystem } from '@/src/modules/rpg/domain';

import { campaignCreateSchema } from './campaign.schema';

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
