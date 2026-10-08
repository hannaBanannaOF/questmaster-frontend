import { useTranslations } from 'next-intl';

import { Badge } from '@/src/design';

import type { CampaignStatus } from '../../../domain';
import { getCampaignStatusMeta } from '../../campaign-status.meta';

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  const t = useTranslations('campaign');
  const { labelKey, tone } = getCampaignStatusMeta(status);
  return <Badge tone={tone}>{t(labelKey)}</Badge>;
}
