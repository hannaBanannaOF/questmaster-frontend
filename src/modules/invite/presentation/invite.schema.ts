import * as yup from 'yup';

import { TABLE_NAME_MAX } from '@/src/modules/campaign/presentation/campaign.schema';

export const ACCEPT_INVITE_FIELDS = ['character', 'playerName'] as const;
export type AcceptInviteField = (typeof ACCEPT_INVITE_FIELDS)[number];

// Mensagens são chaves de tradução (traduzidas no form)
export const acceptInviteSchema = yup.object({
  character: yup.string().trim().required('invite.character.required'),
  playerName: yup
    .string()
    .trim()
    .required('invite.playerName.errors.required')
    .max(TABLE_NAME_MAX, 'invite.playerName.errors.max'),
});
