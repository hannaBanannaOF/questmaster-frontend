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

import { characterUseCases } from '../character.container';
import {
  CHARACTER_FORM_FIELDS,
  characterCreateSchema,
  type CharacterFormField,
} from './character.schema';

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

  try {
    await characterUseCases.createCharacter(input.data);
  } catch (error) {
    return { status: 'error', message: toErrorMessage(error), values };
  }

  // A lista atualizada volta na mesma resposta; o form fecha o modal e avisa
  revalidatePath('/characters');
  return { status: 'success', values: { name: input.data.name } };
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

export async function updateCharacterHpAction(
  characterId: number,
  hp: unknown,
): Promise<ActionResult<number>> {
  if (!Number.isInteger(characterId) || typeof hp !== 'number') {
    return { ok: false };
  }

  try {
    const currentHp = await characterUseCases.updateCharacterHp(
      characterId,
      hp,
    );
    revalidatePath('/characters', 'layout');
    return { ok: true, data: currentHp };
  } catch (error) {
    return { ok: false, message: toErrorMessage(error) };
  }
}
