'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { ActionResult, FormState } from '@/src/lib/actions';
import { toErrorMessage } from '@/src/lib/actions/action-error';
import { setFlash } from '@/src/lib/flash/set-flash';

import { inviteUseCases } from '../invite.container';

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
  _state: FormState<'character'>,
  formData: FormData,
): Promise<FormState<'character'>> {
  const characterSlug = formData.get('character');
  if (typeof hash !== 'string' || !hash) return { status: 'error' };
  if (typeof characterSlug !== 'string' || !characterSlug) {
    return {
      status: 'error',
      fieldErrors: { character: 'invite.character.required' },
    };
  }

  let campaign: { slug: string; name: string };
  try {
    const invite = await inviteUseCases.acceptInvite(hash, characterSlug);
    campaign = { slug: invite.campaignSlug, name: invite.campaignName };
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
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
