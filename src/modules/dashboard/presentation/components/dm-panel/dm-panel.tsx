import { Crown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Card, List, ListItem, Stack, Title } from '@/src/design';
import {
  CampaignCard,
  CampaignStatusBadge,
  type CampaignSummary,
  CreateCampaignButton,
} from '@/src/modules/campaign';

import { countCampaignsByStatus, sortDmCampaigns } from '../../../domain';
import styles from '../../dashboard.module.css';
import { CrossRoleBanner } from '../cross-role-banner/cross-role-banner';
import { RoleEmptyState } from '../role-empty-state/role-empty-state';
import { SectionError } from '../section-error/section-error';

interface DmPanelProps {
  /** Campanhas mestradas pelo usuário; ausente quando a busca falhou. */
  dmCampaigns?: CampaignSummary[];
  hasPlayerRole: boolean;
}

export async function DmPanel({ dmCampaigns, hasPlayerRole }: DmPanelProps) {
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

  if (!dmCampaigns) {
    return (
      <>
        <SectionError title={tCampaign('toast.error.list')} />
        {crossRole}
      </>
    );
  }

  if (dmCampaigns.length === 0) {
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
      <section aria-label={t('dm.summary')} className={styles.statusGrid}>
        {countCampaignsByStatus(dmCampaigns).map(({ status, count }) => (
          <Card key={status} compact>
            <Stack align="center" justify="space-between">
              <CampaignStatusBadge status={status} />
              <span className={styles.count}>{count}</span>
            </Stack>
          </Card>
        ))}
      </section>

      <Stack as="section" direction="column" align="stretch">
        <Title order={3}>{t('dm.campaigns')}</Title>
        <List>
          {sortDmCampaigns(dmCampaigns).map((campaign) => (
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
