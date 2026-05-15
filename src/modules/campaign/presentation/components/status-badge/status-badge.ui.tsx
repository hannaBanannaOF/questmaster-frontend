import { useTranslations } from 'next-intl';

import { CampaignStatus } from '../../../domain';
import { getCampaignStatusMeta } from '../../campaign-status.meta';
import * as S from './staus-badge.styles';

interface StatusBadgeProps {
  status: CampaignStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const t = useTranslations('campaign');
  const statusMeta = getCampaignStatusMeta(status);

  return (
    <S.StatusBadge $status={status}>
      {t(statusMeta.translationLabel)}
    </S.StatusBadge>
  );
}
