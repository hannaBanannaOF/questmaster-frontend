import * as yup from 'yup';

import { GameSystem } from '@/src/modules/rpg/domain';

export const CAMPAIGN_FORM_FIELDS = ['name', 'system', 'overview'] as const;
export type CampaignFormField = (typeof CAMPAIGN_FORM_FIELDS)[number];

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
  overview: yup
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),
});

export const PREMADE_CHARACTER_FORM_FIELDS = ['name', 'maxHp'] as const;
export type PremadeCharacterFormField =
  (typeof PREMADE_CHARACTER_FORM_FIELDS)[number];

const premadeKey = (path: string) => `campaign.premade.form.${path}`;

export const premadeCharacterSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(premadeKey('name.errors.required'))
    .max(255, premadeKey('name.errors.max')),
  maxHp: yup
    .number()
    // Campo vazio é "sem PV", não "não é número"
    .transform((value, original) =>
      typeof original === 'string' && original.trim() === ''
        ? undefined
        : value,
    )
    .typeError(premadeKey('maxHp.errors.type'))
    .integer(premadeKey('maxHp.errors.type'))
    .min(1, premadeKey('maxHp.errors.min'))
    .optional(),
});
