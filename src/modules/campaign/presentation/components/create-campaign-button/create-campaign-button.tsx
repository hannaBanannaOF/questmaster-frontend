import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ComponentProps } from 'react';

import { DialogButton } from '@/src/modules/shared/presentation';
import { getCurrentUserOrNull, getDisplayName } from '@/src/modules/user';

import { CampaignCreateForm } from '../campaign-create-form/campaign-create-form';

type DialogButtonStyle = Pick<
  ComponentProps<typeof DialogButton>,
  'variant' | 'compactLabel'
>;

/** Abre o form de nova campanha num modal, com o apelido sugerido pela conta. */
export async function CreateCampaignButton({
  label,
  ...style
}: { label: string } & DialogButtonStyle) {
  const [t, user] = await Promise.all([
    getTranslations(),
    getCurrentUserOrNull(),
  ]);
  return (
    <DialogButton
      label={label}
      {...style}
      icon={<Plus size={20} />}
      title={t('campaign.create.title')}
      description={t('campaign.create.subtitle')}
      closeLabel={t('common.actions.close')}
    >
      <CampaignCreateForm
        defaultDmName={user ? getDisplayName(user) : undefined}
      />
    </DialogButton>
  );
}
