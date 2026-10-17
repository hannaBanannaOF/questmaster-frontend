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

import { characterUseCases } from '../character.container';
import type { CharacterSummary } from '../domain';
import {
  CHARACTER_EDIT_FORM_FIELDS,
  CHARACTER_FORM_FIELDS,
  characterCreateSchema,
  type CharacterEditFormField,
  characterEditSchema,
  type CharacterFormField,
} from './character.schema';
import {
  CHARACTER_PAGE_SIZE,
  parseCharacterListParams,
  type SearchParams,
} from './character-list.params';
import { safeReturnTo } from './return-to';

// Server Actions são endpoints públicos: todo argumento é validado aqui

export async function createCharacterAction(
  _state: FormState<CharacterFormField>,
  formData: FormData,
): Promise<FormState<CharacterFormField>> {
  const values = formValues(formData, CHARACTER_FORM_FIELDS);
  const input = await validate(characterCreateSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  let slug: string;
  try {
    slug = await characterUseCases.createCharacter(input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  // Vai direto para a ficha nova (ou de volta ao convite); o toast chega como flash
  revalidatePath('/characters');
  revalidatePath('/join', 'layout');
  await setFlash({
    type: 'success',
    title: 'character.toast.success.create.title',
    message: 'character.toast.success.create.message',
    values: { name: input.data.name },
  });
  redirect(
    safeReturnTo(formData.get('returnTo')) ??
      `/characters/${encodeURIComponent(slug)}`,
  );
}

/**
 * Próxima página para o "Mostrar mais" do celular. Recebe os parâmetros
 * crus da URL e passa pelo mesmo parser da página (entrada pública).
 */
export async function loadMoreCharactersAction(
  searchParams: SearchParams,
): Promise<ActionResult<CharacterSummary[]>> {
  const { page, withoutCampaign, q } = parseCharacterListParams(searchParams);
  try {
    const { items } = await characterUseCases.listCharacters(
      { withoutCampaign: withoutCampaign || undefined, q, sort: 'recent' },
      toPageRequest(page, CHARACTER_PAGE_SIZE),
    );
    return { ok: true, data: items };
  } catch (error) {
    return { ok: false, message: toErrorMessage(error) };
  }
}

export async function deleteCharacterAction(
  characterId: number,
  _state: FormState,
  _formData: FormData,
): Promise<FormState> {
  if (!Number.isInteger(characterId)) return { status: 'error' };

  let name: string;
  try {
    ({ name } = await characterUseCases.deleteCharacter(characterId));
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error) };
  }

  // A ficha some também da lista de jogadores da campanha
  revalidatePath('/characters', 'layout');
  revalidatePath('/campaigns', 'layout');
  await setFlash({
    type: 'success',
    title: 'character.toast.success.delete.title',
    message: 'character.toast.success.delete.message',
    values: { name },
  });
  redirect('/characters', RedirectType.replace);
}

export async function editCharacterAction(
  characterId: number,
  _state: FormState<CharacterEditFormField>,
  formData: FormData,
): Promise<FormState<CharacterEditFormField>> {
  if (!Number.isInteger(characterId)) return { status: 'error' };

  const values = formValues(formData, CHARACTER_EDIT_FORM_FIELDS);
  const input = await validate(characterEditSchema, values);
  if (!input.ok) {
    return { status: 'error', fieldErrors: input.fieldErrors, values };
  }

  let slug: string;
  try {
    slug = await characterUseCases.editCharacter(characterId, input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  revalidatePath('/characters', 'layout');
  revalidatePath('/campaigns', 'layout');
  await setFlash({
    type: 'success',
    title: 'character.toast.success.edit.title',
    message: 'character.toast.success.edit.message',
    values: { name: input.data.name },
  });
  // O slug acompanha o nome: o endereço antigo deixa de existir
  redirect(`/characters/${encodeURIComponent(slug)}`, RedirectType.replace);
}
