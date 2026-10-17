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
import { toPageRequest } from '@/src/lib/pagination';

import { campaignUseCases } from '../campaign.container';
import {
  CampaignStatus,
  type CampaignSummary,
  isCampaignStatus,
} from '../domain';
import {
  CAMPAIGN_FORM_FIELDS,
  campaignCreateSchema,
  type CampaignFormField,
  PREMADE_CHARACTER_FORM_FIELDS,
  type PremadeCharacterFormField,
  premadeCharacterSchema,
  TABLE_NAME_FORM_FIELDS,
  type TableNameFormField,
  tableNameSchema,
} from './campaign.schema';
import {
  CAMPAIGN_PAGE_SIZE,
  parseCampaignListParams,
  type SearchParams,
} from './campaign-list.params';

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

  let slug: string;
  try {
    slug = await campaignUseCases.createCampaign(input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  // Vai direto para a campanha nova; o toast chega como flash
  revalidatePath('/campaigns');
  await setFlash({
    type: 'success',
    title: 'campaign.toast.success.create.title',
    message: 'campaign.toast.success.create.message',
    values: { name: input.data.name },
  });
  redirect(`/campaigns/${encodeURIComponent(slug)}`);
}

/**
 * Próxima página para o "Mostrar mais" do celular. Recebe os parâmetros
 * crus da URL e passa pelo mesmo parser da página (entrada pública).
 */
export async function loadMoreCampaignsAction(
  searchParams: SearchParams,
): Promise<ActionResult<CampaignSummary[]>> {
  const { page, role, status, q } = parseCampaignListParams(searchParams);
  try {
    const { items } = await campaignUseCases.listCampaigns(
      { role, status, q, sort: 'recent' },
      toPageRequest(page, CAMPAIGN_PAGE_SIZE),
    );
    return { ok: true, data: items };
  } catch (error) {
    return { ok: false, message: toErrorMessage(error) };
  }
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

/** O usuário muda o próprio apelido nesta campanha (mestre ou jogador). */
export async function updateTableNameAction(
  campaignId: number,
  _state: FormState<TableNameFormField>,
  formData: FormData,
): Promise<FormState<TableNameFormField>> {
  if (!Number.isInteger(campaignId)) return { status: 'error' };

  const values = formValues(formData, TABLE_NAME_FORM_FIELDS);
  const input = await validate(tableNameSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  let name: string;
  try {
    name = await campaignUseCases.updateTableName(campaignId, input.data.name);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  revalidatePath('/campaigns', 'layout');
  return { status: 'success', values: { name } };
}

/** "Encerrar" confirmado no AlertDialog: arquiva a campanha. */
export async function archiveCampaignAction(
  campaignId: number,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  const result = await updateCampaignStatusAction(
    campaignId,
    CampaignStatus.ARCHIVED,
  );
  return result.ok
    ? { status: 'success' }
    : { status: 'error', message: result.message };
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
