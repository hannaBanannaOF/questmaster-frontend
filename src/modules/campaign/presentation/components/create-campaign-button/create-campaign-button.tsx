import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DialogButton } from '@/src/modules/shared/presentation';

import { CampaignCreateForm } from '../campaign-create-form/campaign-create-form';

/** Abre o form de nova campanha num modal. */
export function CreateCampaignButton({ label }: { label: string }) {
  const t = useTranslations();
  return (
    <DialogButton
      label={label}
      icon={<Plus size={20} />}
      title={t('campaign.create.title')}
      description={t('campaign.create.subtitle')}
      closeLabel={t('common.actions.close')}
    >
      <CampaignCreateForm />
    </DialogButton>
  );
}
