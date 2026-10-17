import * as yup from 'yup';

import { GameSystem } from '@/src/modules/rpg/domain';

export const CHARACTER_FORM_FIELDS = ['name', 'system'] as const;
export type CharacterFormField = (typeof CHARACTER_FORM_FIELDS)[number];

// Mensagens são chaves de tradução (traduzidas no form)
const key = (path: string) => `character.create.form.${path}`;

export const characterCreateSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(key('name.errors.required'))
    .max(255, key('name.errors.max')),
  system: yup
    .mixed<GameSystem>()
    .required(key('game_system.errors.required'))
    .oneOf(Object.values(GameSystem), key('game_system.errors.required')),
});

export const CHARACTER_EDIT_FORM_FIELDS = ['name'] as const;
export type CharacterEditFormField =
  (typeof CHARACTER_EDIT_FORM_FIELDS)[number];

const editKey = (path: string) => `character.edit.form.${path}`;

export const characterEditSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(editKey('name.errors.required'))
    .max(255, editKey('name.errors.max')),
});
