'use client';

import { Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { Button, Stack, SubmitButton, TextField } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import type { CharacterEditFormField } from '../../character.schema';

type State = FormState<CharacterEditFormField>;

/** Form de edição da ficha (dentro do modal); o sucesso redireciona para o slug novo. */
export function CharacterEditForm({
  action,
  name,
  maxHp,
}: {
  /** Server Action já vinculada ao id do personagem. */
  action: (state: State, formData: FormData) => Promise<State>;
  name: string;
  maxHp?: number;
}) {
  const t = useTranslations();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(action, initialFormState as State);
  useFormErrorToast(state, 'character.toast.error.update');

  const fieldError = (field: CharacterEditFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`character.edit.form.${path}`);

  return (
    <form action={formAction} noValidate>
      <Stack direction="column" align="stretch">
        <TextField
          name="name"
          label={label('name.label')}
          required
          maxLength={255}
          defaultValue={state.values?.name ?? name}
          error={fieldError('name')}
        />
        <TextField
          name="maxHp"
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          label={label('maxHp.label')}
          placeholder={label('maxHp.placeholder')}
          defaultValue={state.values?.maxHp ?? maxHp?.toString()}
          error={fieldError('maxHp')}
        />
        <Stack justify="end">
          <Button variant="text" onClick={closeDialog}>
            {label('cancel')}
          </Button>
          <SubmitButton icon={<Save size={16} />}>
            {label('submit')}
          </SubmitButton>
        </Stack>
      </Stack>
    </form>
  );
}
