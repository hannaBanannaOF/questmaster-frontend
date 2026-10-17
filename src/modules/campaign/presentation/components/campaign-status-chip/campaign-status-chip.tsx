import { useTranslations } from 'next-intl';

import { Chip } from '@/src/design';

import type { CampaignStatus } from '../../../domain';
import { getCampaignStatusMeta } from '../../campaign-status.meta';

/** Status como Chip soft com bolinha (telas no padrão HeroUI). */
export function CampaignStatusChip({ status }: { status: CampaignStatus }) {
  const t = useTranslations('campaign');
  const { labelKey, chipTone } = getCampaignStatusMeta(status);
  return (
    <Chip tone={chipTone} dot>
      {t(labelKey)}
    </Chip>
  );
}
