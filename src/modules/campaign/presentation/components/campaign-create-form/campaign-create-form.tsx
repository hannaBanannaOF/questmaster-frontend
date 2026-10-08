'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import {
  Button,
  SelectField,
  Stack,
  SubmitButton,
  TextAreaField,
  TextField,
  useToast,
} from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { getGameSystemOptions } from '@/src/modules/rpg/presentation/game-system.meta';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { createCampaignAction } from '../../campaign.actions';
import type { CampaignFormField } from '../../campaign.schema';

/** Form de criação (dentro do modal); validação na Server Action. */
export function CampaignCreateForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(
    createCampaignAction,
    initialFormState as FormState<CampaignFormField>,
  );
  useFormErrorToast(state, 'campaign.toast.error.create');

  useEffect(() => {
    if (state.status !== 'success') return;
    toast({
      type: 'success',
      title: t('campaign.toast.success.create.title'),
      message: t('campaign.toast.success.create.message', {
        name: state.values?.name ?? '',
      }),
    });
    closeDialog();
  }, [state, t, toast, closeDialog]);

  const fieldError = (field: CampaignFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`campaign.create.form.${path}`);

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
        <SelectField
          name="system"
          label={label('game_system.label')}
          placeholder={t('common.form.selectPlaceholder')}
          options={getGameSystemOptions()}
          required
          defaultValue={state.values?.system ?? ''}
          error={fieldError('system')}
        />
        <TextAreaField
          name="overview"
          label={label('overview.label')}
          placeholder={label('overview.placeholder')}
          defaultValue={state.values?.overview}
          error={fieldError('overview')}
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
