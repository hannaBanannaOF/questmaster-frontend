import * as yup from 'yup';

import { GameSystem } from '@/src/modules/rpg/domain';

export const CAMPAIGN_FORM_FIELDS = [
  'name',
  'system',
  'dmName',
  'overview',
] as const;
export type CampaignFormField = (typeof CAMPAIGN_FORM_FIELDS)[number];

/** Limite do apelido na campanha (core: table-names). */
export const TABLE_NAME_MAX = 50;

// Mensagens são chaves de tradução (traduzidas no form)
const key = (path: string) => `campaign.create.form.${path}`;

export const campaignCreateSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(key('name.errors.required'))
    .max(255, key('name.errors.max')),
  system: yup
    .mixed<GameSystem>()
    .required(key('game_system.errors.required'))
    .oneOf(Object.values(GameSystem), key('game_system.errors.required')),
  // Apelido do mestre nesta campanha (1 a 50, como no core)
  dmName: yup
    .string()
    .trim()
    .required(key('dm_name.errors.required'))
    .max(TABLE_NAME_MAX, key('dm_name.errors.max')),
  overview: yup
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),
});

export const PREMADE_CHARACTER_FORM_FIELDS = ['name'] as const;
export type PremadeCharacterFormField =
  (typeof PREMADE_CHARACTER_FORM_FIELDS)[number];

const premadeKey = (path: string) => `campaign.premade.form.${path}`;

export const premadeCharacterSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(premadeKey('name.errors.required'))
    .max(255, premadeKey('name.errors.max')),
});

export const TABLE_NAME_FORM_FIELDS = ['name'] as const;
export type TableNameFormField = (typeof TABLE_NAME_FORM_FIELDS)[number];

export const tableNameSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('campaign.tableName.form.errors.required')
    .max(TABLE_NAME_MAX, 'campaign.tableName.form.errors.max'),
});
