'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { Button, Stack, SubmitButton, TextField, useToast } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import type { PremadeCharacterFormField } from '../../campaign.schema';

type State = FormState<PremadeCharacterFormField>;

/** Form de ficha pronta (dentro do modal); validação na Server Action. */
export function PremadeCharacterForm({
  action,
}: {
  /** Server Action já vinculada ao id da campanha. */
  action: (state: State, formData: FormData) => Promise<State>;
}) {
  const t = useTranslations();
  const { toast } = useToast();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(action, initialFormState as State);
  useFormErrorToast(state, 'campaign.premade.toast.error.create');

  useEffect(() => {
    if (state.status !== 'success') return;
    toast({
      type: 'success',
      title: t('campaign.premade.toast.success.create.title'),
      message: t('campaign.premade.toast.success.create.message', {
        name: state.values?.name ?? '',
      }),
    });
    closeDialog();
  }, [state, t, toast, closeDialog]);

  const fieldError = (field: PremadeCharacterFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`campaign.premade.form.${path}`);

  return (
    <form action={formAction} noValidate>
      <Stack direction="column" align="stretch">
        <TextField
          name="name"
          label={label('name.label')}
          placeholder={label('name.placeholder')}
          required
          maxLength={255}
          defaultValue={state.values?.name}
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
          defaultValue={state.values?.maxHp}
          error={fieldError('maxHp')}
        />
        <Stack justify="end">
          <Button variant="text" onClick={closeDialog}>
            {label('cancel')}
          </Button>
          <SubmitButton icon={<Plus size={16} />}>
            {label('submit')}
          </SubmitButton>
        </Stack>
      </Stack>
    </form>
  );
}
