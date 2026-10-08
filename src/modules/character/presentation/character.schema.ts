import * as yup from 'yup';

import { GameSystem } from '@/src/modules/rpg/domain';

export const CHARACTER_FORM_FIELDS = ['name', 'hp', 'system'] as const;
export type CharacterFormField = (typeof CHARACTER_FORM_FIELDS)[number];

// Mensagens são chaves de tradução (traduzidas no form)
const key = (path: string) => `character.create.form.${path}`;

export const characterCreateSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(key('name.errors.required'))
    .max(255, key('name.errors.max')),
  hp: yup
    .number()
    // Campo vazio é "obrigatório", não "não é número"
    .transform((value, original) =>
      typeof original === 'string' && original.trim() === ''
        ? undefined
        : value,
    )
    .typeError(key('hp.errors.type'))
    .required(key('hp.errors.required'))
    .integer(key('hp.errors.type'))
    .min(1, key('hp.errors.min')),
  system: yup
    .mixed<GameSystem>()
    .required(key('game_system.errors.required'))
    .oneOf(Object.values(GameSystem), key('game_system.errors.required')),
});
