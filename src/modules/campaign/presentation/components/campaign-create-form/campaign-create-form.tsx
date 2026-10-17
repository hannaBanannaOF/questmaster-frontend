'use client';

import { Dices, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useState } from 'react';

import {
  Button,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { GameSystem, isGameSystem } from '@/src/modules/rpg/domain';
import {
  getGameSystemMeta,
  getGameSystemOptions,
} from '@/src/modules/rpg/presentation/game-system.meta';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { createCampaignAction } from '../../campaign.actions';
import { type CampaignFormField, TABLE_NAME_MAX } from '../../campaign.schema';
import styles from './campaign-create-form.module.css';

/** Form de criação (dentro do modal); validação na Server Action, que leva à campanha nova. */
export function CampaignCreateForm({
  defaultDmName,
}: {
  /** Sugestão para o apelido do mestre: o nome da conta. */
  defaultDmName?: string;
}) {
  const t = useTranslations();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(
    createCampaignAction,
    initialFormState as FormState<CampaignFormField>,
  );
  useFormErrorToast(state, 'campaign.toast.error.create');
  // Só para o glifo ao lado do valor; o select segue não controlado
  const [system, setSystem] = useState(state.values?.system ?? '');

  const fieldError = (field: CampaignFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`campaign.create.form.${path}`);
  const SystemIcon = isGameSystem(system)
    ? getGameSystemMeta(system as GameSystem).icon
    : Dices;

  return (
    <form action={formAction} noValidate className={styles.form}>
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
        placeholder={label('game_system.placeholder')}
        description={label('game_system.description')}
        options={getGameSystemOptions()}
        required
        defaultValue={state.values?.system ?? ''}
        onChange={(event) => setSystem(event.currentTarget.value)}
        startContent={<SystemIcon size={18} />}
        error={fieldError('system')}
      />
      <TextField
        name="dmName"
        label={label('dm_name.label')}
        description={label('dm_name.description')}
        required
        maxLength={TABLE_NAME_MAX}
        defaultValue={state.values?.dmName ?? defaultDmName}
        error={fieldError('dmName')}
      />
      <TextAreaField
        name="overview"
        label={label('overview.label')}
        placeholder={label('overview.placeholder')}
        description={label('overview.description')}
        defaultValue={state.values?.overview}
        error={fieldError('overview')}
      />
      <div className={styles.footer}>
        <Button variant="tertiary" onClick={closeDialog}>
          {label('cancel')}
        </Button>
        <SubmitButton variant="primary" icon={<Plus size={18} />}>
          {label('submit')}
        </SubmitButton>
      </div>
    </form>
  );
}
