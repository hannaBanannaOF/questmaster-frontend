'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  type ActionResult,
  type FormState,
  formValues,
  validate,
} from '@/src/lib/actions';
import { toErrorMessage } from '@/src/lib/actions/action-error';
import { HttpError } from '@/src/lib/errors';
import { setFlash } from '@/src/lib/flash/set-flash';

import { inviteUseCases } from '../invite.container';
import {
  ACCEPT_INVITE_FIELDS,
  type AcceptInviteField,
  acceptInviteSchema,
} from './invite.schema';

// Server Actions são endpoints públicos: todo argumento é validado aqui

export async function createInviteAction(
  campaignId: number,
): Promise<ActionResult<string>> {
  if (!Number.isInteger(campaignId)) return { ok: false };

  try {
    const hash = await inviteUseCases.createInvite(campaignId);
    revalidatePath('/campaigns', 'layout');
    return { ok: true, data: hash };
  } catch (error) {
    return { ok: false, message: toErrorMessage(error) };
  }
}

export async function acceptInviteAction(
  hash: string,
  _state: FormState<AcceptInviteField>,
  formData: FormData,
): Promise<FormState<AcceptInviteField>> {
  if (typeof hash !== 'string' || !hash) return { status: 'error' };

  const values = formValues(formData, ACCEPT_INVITE_FIELDS);
  const input = await validate(acceptInviteSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  let campaign: { slug: string; name: string };
  try {
    const invite = await inviteUseCases.acceptInvite(
      hash,
      input.data.character,
      input.data.playerName,
    );
    campaign = { slug: invite.campaignSlug, name: invite.campaignName };
  } catch (error) {
    // Outro jogador pegou a ficha pronta antes: a lista volta sem ela
    if (error instanceof HttpError && error.status === 409) {
      revalidatePath(`/join/${hash}`);
      return {
        status: 'error',
        fieldErrors: { character: 'invite.character.taken' },
        values,
      };
    }
    return { status: 'error', message: toErrorMessage(error), values };
  }

  revalidatePath('/campaigns', 'layout');
  revalidatePath('/characters', 'layout');
  await setFlash({
    type: 'success',
    title: 'invite.toast.success.join.title',
    message: 'invite.toast.success.join.message',
    values: { name: campaign.name },
  });
  redirect(`/campaigns/${encodeURIComponent(campaign.slug)}`);
}
