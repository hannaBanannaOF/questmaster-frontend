'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { FormState } from '@/src/lib/actions';
import type { GameSystem } from '@/src/modules/rpg/domain';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';

import type { PremadeCharacterFormField } from '../../campaign.schema';
import { PremadeCharacterForm } from '../premade-character-form/premade-character-form';
import styles from './campaign-detail.module.css';

type State = FormState<PremadeCharacterFormField>;

/** Card tracejado no fim da grade de fichas prontas; abre o form num modal. */
export function AddPremadeCard({
  action,
  system,
}: {
  /** Server Action já vinculada ao id da campanha. */
  action: (state: State, formData: FormData) => Promise<State>;
  system: GameSystem;
}) {
  const t = useTranslations();

  return (
    <DialogButton
      label={t('campaign.premade.new')}
      title={t('campaign.premade.create.title')}
      description={t('campaign.premade.create.subtitle')}
      closeLabel={t('common.actions.close')}
      renderTrigger={(open) => (
        <button
          type="button"
          className={styles.addCard}
          aria-haspopup="dialog"
          onClick={open}
        >
          <Plus aria-hidden />
          {t('campaign.premade.new')}
        </button>
      )}
    >
      <PremadeCharacterForm action={action} system={system} />
    </DialogButton>
  );
}
