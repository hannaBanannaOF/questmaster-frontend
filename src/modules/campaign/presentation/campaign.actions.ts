'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import {
  type ActionResult,
  type FormState,
  formValues,
  validate,
} from '@/src/lib/actions';
import { toErrorMessage } from '@/src/lib/actions/action-error';
import { setFlash } from '@/src/lib/flash/set-flash';

import { campaignUseCases } from '../campaign.container';
import { isCampaignStatus } from '../domain';
import {
  CAMPAIGN_FORM_FIELDS,
  campaignCreateSchema,
  type CampaignFormField,
  PREMADE_CHARACTER_FORM_FIELDS,
  type PremadeCharacterFormField,
  premadeCharacterSchema,
} from './campaign.schema';

// Server Actions são endpoints públicos: todo argumento é validado aqui

export async function createCampaignAction(
  _state: FormState<CampaignFormField>,
  formData: FormData,
): Promise<FormState<CampaignFormField>> {
  const values = formValues(formData, CAMPAIGN_FORM_FIELDS);
  const input = await validate(campaignCreateSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  try {
    await campaignUseCases.createCampaign(input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  // A lista atualizada volta na mesma resposta; o form fecha o modal e avisa
  revalidatePath('/campaigns');
  return { status: 'success', values: { name: input.data.name } };
}

export async function deleteCampaignAction(
  campaignId: number,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  if (!Number.isInteger(campaignId)) return { status: 'error' };

  let name: string;
  try {
    ({ name } = await campaignUseCases.deleteCampaign(campaignId));
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
  }

  revalidatePath('/campaigns', 'layout');
  await setFlash({
    type: 'success',
    title: 'campaign.toast.success.delete.title',
    message: 'campaign.toast.success.delete.message',
    values: { name },
  });
  redirect('/campaigns', RedirectType.replace);
}

export async function updateCampaignStatusAction(
  campaignId: number,
  status: unknown,
): Promise<ActionResult> {
  if (!Number.isInteger(campaignId) || !isCampaignStatus(status)) {
    return { ok: false };
  }

  try {
    await campaignUseCases.updateCampaignStatus(campaignId, status);
  } catch (error) {
    return { ok: false, message: toErrorMessage(error) };
  }

  revalidatePath('/campaigns', 'layout');
  return { ok: true, data: undefined };
}

export async function createPremadeCharacterAction(
  campaignId: number,
  _state: FormState<PremadeCharacterFormField>,
  formData: FormData,
): Promise<FormState<PremadeCharacterFormField>> {
  if (!Number.isInteger(campaignId)) return { status: 'error' };

  const values = formValues(formData, PREMADE_CHARACTER_FORM_FIELDS);
  const input = await validate(premadeCharacterSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  try {
    await campaignUseCases.createPremadeCharacter(campaignId, input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  revalidatePath('/campaigns', 'layout');
  return { status: 'success', values: { name: input.data.name } };
}

export async function deletePremadeCharacterAction(
  campaignSlug: string,
  characterId: number,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  if (typeof campaignSlug !== 'string' || !Number.isInteger(characterId)) {
    return { status: 'error' };
  }

  try {
    await campaignUseCases.deletePremadeCharacter(characterId);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
  }

  revalidatePath('/campaigns', 'layout');
  await setFlash({
    type: 'success',
    title: 'campaign.premade.toast.success.delete.title',
    message: 'campaign.premade.toast.success.delete.message',
  });
  // Volta para a mesma campanha; o slug só monta um caminho interno
  redirect(
    `/campaigns/${encodeURIComponent(campaignSlug)}`,
    RedirectType.replace,
  );
}

export async function leaveCampaignAction(
  campaignId: number,
  characterId: number,
  characterSlug: string,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  if (
    !Number.isInteger(campaignId) ||
    !Number.isInteger(characterId) ||
    typeof characterSlug !== 'string'
  ) {
    return { status: 'error' };
  }

  try {
    await campaignUseCases.removeCharacterFromCampaign(campaignId, characterId);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
  }

  revalidatePath('/campaigns', 'layout');
  revalidatePath('/characters', 'layout');
  await setFlash({
    type: 'success',
    title: 'campaign.party.toast.success.leave.title',
    message: 'campaign.party.toast.success.leave.message',
  });
  // Era a única ficha? A campanha some para o jogador; a ficha continua dele
  redirect(
    `/characters/${encodeURIComponent(characterSlug)}`,
    RedirectType.replace,
  );
}

export async function removeFromCampaignAction(
  campaignId: number,
  campaignSlug: string,
  characterId: number,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  if (
    !Number.isInteger(campaignId) ||
    !Number.isInteger(characterId) ||
    typeof campaignSlug !== 'string'
  ) {
    return { status: 'error' };
  }

  try {
    await campaignUseCases.removeCharacterFromCampaign(campaignId, characterId);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
  }

  revalidatePath('/campaigns', 'layout');
  await setFlash({
    type: 'success',
    title: 'campaign.party.toast.success.remove.title',
    message: 'campaign.party.toast.success.remove.message',
  });
  redirect(
    `/campaigns/${encodeURIComponent(campaignSlug)}`,
    RedirectType.replace,
  );
}
