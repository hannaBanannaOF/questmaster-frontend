import { Crown } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { List, ListItem, Stack, Title } from '@/src/design';
import {
  CampaignCard,
  campaignListHref,
  CreateCampaignButton,
} from '@/src/modules/campaign';

import type { DashboardCampaigns } from '../../dashboard.loaders';
import { CrossRoleBanner } from '../cross-role-banner/cross-role-banner';
import { RoleEmptyState } from '../role-empty-state/role-empty-state';
import { SectionError } from '../section-error/section-error';
import { StatusCountGrid } from '../status-count-grid/status-count-grid';

interface DmPanelProps {
  /** Ausente quando a busca de campanhas falhou. */
  campaigns?: DashboardCampaigns;
  hasPlayerRole: boolean;
}

export async function DmPanel({ campaigns, hasPlayerRole }: DmPanelProps) {
  const [t, tCampaign] = await Promise.all([
    getTranslations('dashboard'),
    getTranslations('campaign'),
  ]);

  const crossRole = hasPlayerRole && (
    <CrossRoleBanner
      title={t('crossRole.toPlayer.title')}
      hint={t('crossRole.toPlayer.hint')}
      href="/?view=player"
      action={t('crossRole.toPlayer.action')}
    />
  );

  if (!campaigns) {
    return (
      <>
        <SectionError title={tCampaign('toast.error.list')} />
        {crossRole}
      </>
    );
  }

  if (campaigns.dmTotal === 0) {
    const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;
    return (
      <>
        <RoleEmptyState
          icon={<Crown size={32} />}
          title={t('dm.empty.title')}
          message={t('dm.empty.message')}
          stepsLabel={t('steps')}
          steps={[
            t.rich('dm.empty.steps.create', { bold }),
            t('dm.empty.steps.invite'),
            t.rich('dm.empty.steps.start', { bold }),
          ]}
          action={<CreateCampaignButton label={t('dm.empty.action')} />}
        />
        {crossRole}
      </>
    );
  }

  return (
    <>
      <StatusCountGrid counts={campaigns.dmCounts} />

      <Stack as="section" direction="column" align="stretch">
        <Stack align="center" justify="space-between">
          <Title order={3}>{t('dm.campaigns')}</Title>
          {campaigns.dmTotal > campaigns.dmPreview.items.length && (
            <Link href={campaignListHref({ role: 'dm' })}>
              {t('dm.seeAll', { count: campaigns.dmTotal })}
            </Link>
          )}
        </Stack>
        <List>
          {campaigns.dmPreview.items.map((campaign) => (
            <ListItem key={campaign.slug}>
              <CampaignCard campaign={campaign} />
            </ListItem>
          ))}
        </List>
      </Stack>

      {crossRole}
    </>
  );
}
