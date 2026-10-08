import { getTranslations } from 'next-intl/server';

import {
  Breadcrumb,
  Card,
  DetailPage,
  Divider,
  Quote,
  Stack,
  Text,
  Title,
} from '@/src/design';
import { InviteLinkControl } from '@/src/modules/invite/presentation/components/invite-link-control/invite-link-control';
import { createInviteAction } from '@/src/modules/invite/presentation/invite.actions';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { ConfirmDeleteButton } from '@/src/modules/shared/presentation';

import {
  canDeleteCampaign,
  canInviteToCampaign,
  canManageCampaign,
  getAvailableTransitions,
} from '../../domain';
import {
  deleteCampaignAction,
  updateCampaignStatusAction,
} from '../campaign.actions';
import { getCampaignBySlug } from '../campaign.loaders';
import { CampaignCharacters } from '../components/campaign-characters/campaign-characters';
import { CampaignStatusActions } from '../components/campaign-status-actions/campaign-status-actions';
import { CampaignStatusBadge } from '../components/campaign-status-badge/campaign-status-badge';
import { DmBadge } from '../components/dm-badge/dm-badge';

const TITLE_ID = 'campaign-title';

export async function CampaignDetailsView({ slug }: { slug: string }) {
  const [campaign, t, tCommon] = await Promise.all([
    getCampaignBySlug(slug),
    getTranslations('campaign'),
    getTranslations('common'),
  ]);

  const { label: systemLabel } = getGameSystemMeta(campaign.system);
  const isManager = canManageCampaign(campaign);
  const transitions = isManager ? getAvailableTransitions(campaign.status) : [];
  const canInvite = canInviteToCampaign(campaign);

  return (
    <DetailPage
      breadcrumb={
        <Breadcrumb
          label={tCommon('breadcrumb')}
          segments={[
            { label: t('list.title'), href: '/campaigns' },
            { label: campaign.name },
          ]}
        />
      }
      hero={
        <Card as="article" hero aria-labelledby={TITLE_ID}>
          <Stack direction="column" align="stretch">
            <Stack align="start" justify="space-between" wrap>
              <Stack align="center">
                <GameSystemIcon system={campaign.system} />
                <Stack direction="column" gap="xxs">
                  <Stack align="center" wrap>
                    <Title order={3} id={TITLE_ID}>
                      {campaign.name}
                    </Title>
                    {campaign.isDm && <DmBadge />}
                    <CampaignStatusBadge status={campaign.status} />
                  </Stack>
                  <Text tone="muted">{systemLabel}</Text>
                </Stack>
              </Stack>
              {canDeleteCampaign(campaign) && (
                <ConfirmDeleteButton
                  // id vinculado aqui; a permissão é checada no use case/API
                  action={deleteCampaignAction.bind(null, campaign.id)}
                  errorTitleKey="campaign.toast.error.delete"
                  labels={{
                    trigger: t('actions.delete'),
                    title: t('delete.title'),
                    confirm: t('delete.submit'),
                    cancel: t('delete.cancel'),
                    close: tCommon('actions.close'),
                  }}
                  description={t.rich('delete.confirm', {
                    name: campaign.name,
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                />
              )}
            </Stack>

            {campaign.overview && <Quote>{campaign.overview}</Quote>}

            {isManager && (transitions.length > 0 || canInvite) && (
              <>
                <Divider />
                <Stack align="center" wrap>
                  <CampaignStatusActions
                    status={campaign.status}
                    transitions={transitions}
                    updateStatus={updateCampaignStatusAction.bind(
                      null,
                      campaign.id,
                    )}
                  />
                  {transitions.length > 0 && canInvite && <Divider vertical />}
                  {canInvite && (
                    <InviteLinkControl
                      hash={campaign.inviteHash}
                      createInvite={createInviteAction.bind(null, campaign.id)}
                    />
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Card>
      }
    >
      {campaign.playerCount > 0 && (
        <CampaignCharacters characters={campaign.characters} />
      )}
    </DetailPage>
  );
}
