import { Crown, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  CollectionSearch,
  CollectionToolbar,
  SearchField,
  Tabs,
  ToggleLinks,
} from '@/src/design';

import { type CampaignRole, CampaignStatus } from '../../../domain';
import {
  campaignListHref,
  type CampaignListParams,
} from '../../campaign-list.params';
import { getCampaignStatusMeta } from '../../campaign-status.meta';

const ROLES = [
  { key: 'all', role: undefined, icon: null },
  { key: 'dm', role: 'dm', icon: Crown },
  { key: 'player', role: 'player', icon: Swords },
] as const satisfies readonly {
  key: string;
  role?: CampaignRole;
  icon: unknown;
}[];

const STATUSES = [
  CampaignStatus.ACTIVE,
  CampaignStatus.DRAFT,
  CampaignStatus.PAUSED,
  CampaignStatus.ARCHIVED,
];

/** Busca, papel e status; tudo na URL e mudar qualquer um volta à página 1. */
export function CampaignListFilters({ q, role, status }: CampaignListParams) {
  const t = useTranslations('campaign');

  return (
    <CollectionToolbar>
      {/* Form GET: Enter busca e os filtros atuais vão junto */}
      <CollectionSearch>
        <form action="/campaigns" role="search">
          {role && <input type="hidden" name="role" value={role} />}
          {status && <input type="hidden" name="status" value={status} />}
          <SearchField
            name="q"
            label={t('list.search.label')}
            placeholder={t('list.search.placeholder')}
            defaultValue={q}
            clearHref={q ? campaignListHref({ role, status }) : undefined}
            clearLabel={t('list.search.clear')}
          />
        </form>
      </CollectionSearch>
      <Tabs
        label={t('list.filters.role')}
        items={ROLES.map(({ key, role: value, icon: Icon }) => ({
          href: campaignListHref({ q, role: value, status }),
          label: t(`list.filters.${key}`),
          icon: Icon && <Icon aria-hidden />,
          current: value === role,
        }))}
      />
      <ToggleLinks
        label={t('list.filters.status')}
        items={[
          {
            href: campaignListHref({ q, role }),
            label: t('list.filters.anyStatus'),
            current: !status,
          },
          ...STATUSES.map((value) => {
            const { labelKey, chipTone } = getCampaignStatusMeta(value);
            return {
              href: campaignListHref({ q, role, status: value }),
              label: t(labelKey),
              current: value === status,
              dot: chipTone === 'archived' ? undefined : chipTone,
            };
          }),
        ]}
      />
    </CollectionToolbar>
  );
}
