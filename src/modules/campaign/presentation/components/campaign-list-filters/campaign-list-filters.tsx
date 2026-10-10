import { useTranslations } from 'next-intl';

import { SegmentedNav, Stack } from '@/src/design';

import { type CampaignRole, CampaignStatus } from '../../../domain';
import {
  campaignListHref,
  type CampaignListParams,
} from '../../campaign-list.params';
import { getCampaignStatusMeta } from '../../campaign-status.meta';
import { CampaignStatusFilter } from '../campaign-status-filter/campaign-status-filter';

const ROLES: { role?: CampaignRole; key: 'all' | 'dm' | 'player' }[] = [
  { key: 'all' },
  { role: 'dm', key: 'dm' },
  { role: 'player', key: 'player' },
];

const STATUSES = [
  CampaignStatus.ACTIVE,
  CampaignStatus.DRAFT,
  CampaignStatus.PAUSED,
  CampaignStatus.ARCHIVED,
];

/** Filtros da lista; trocar qualquer um volta pra página 1. */
export function CampaignListFilters({ role, status }: CampaignListParams) {
  const t = useTranslations('campaign');

  return (
    <Stack align="center" justify="space-between" wrap>
      <SegmentedNav
        label={t('list.filters.role')}
        items={ROLES.map((option) => ({
          href: campaignListHref({ role: option.role, status }),
          label: t(`list.filters.${option.key}`),
          current: option.role === role,
        }))}
      />
      <CampaignStatusFilter
        role={role}
        status={status}
        labels={{
          status: t('list.filters.status'),
          apply: t('list.filters.apply'),
        }}
        options={[
          { value: '', label: t('list.filters.anyStatus') },
          ...STATUSES.map((value) => ({
            value,
            label: t(getCampaignStatusMeta(value).labelKey),
          })),
        ]}
      />
    </Stack>
  );
}
