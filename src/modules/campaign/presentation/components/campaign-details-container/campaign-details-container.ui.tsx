import { Archive, Pause, Play, Trash2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

import {
  Breadcrumb,
  Button,
  Card,
  Container,
  Divider,
  Quote,
  Skeleton,
  Text,
  Title,
  useModal,
} from '@/src/design';
import { InviteContainer } from '@/src/modules/invite';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { CampaignDetails, CampaignStatus } from '../../../domain';
import { useUpdateCampaignStatus } from '../../campaign.hooks';
import { getDeleteModalConfig } from '../delete-campaign-modal/delete-campaign-modal.ui';
import { DmBadge } from '../dm-badge/dm-badge.ui';
import { StatusBadge } from '../status-badge/status-badge.ui';

type StatusAction = {
  label: string;
  nextStatus: CampaignStatus;
  icon: ReactNode;
};

function getAvailableStatusActions(campaign: CampaignDetails): StatusAction[] {
  switch (campaign.status) {
    case CampaignStatus.DRAFT:
      return [
        {
          label: 'actions.start',
          nextStatus: CampaignStatus.ACTIVE,
          icon: <Play display={'flex'} size={12} />,
        },
      ];

    case CampaignStatus.PAUSED:
      return [
        {
          label: 'actions.resume',
          nextStatus: CampaignStatus.ACTIVE,
          icon: <Play display={'flex'} size={12} />,
        },
        {
          label: 'actions.archive',
          nextStatus: CampaignStatus.ARCHIVED,
          icon: <Archive display={'flex'} size={12} />,
        },
      ];

    case CampaignStatus.ACTIVE:
      return [
        {
          label: 'actions.pause',
          nextStatus: CampaignStatus.PAUSED,
          icon: <Pause display={'flex'} size={12} />,
        },
        {
          label: 'actions.end',
          nextStatus: CampaignStatus.ARCHIVED,
          icon: <Archive display={'flex'} size={12} />,
        },
      ];

    case CampaignStatus.ARCHIVED:
      return [];

    default:
      return [];
  }
}

interface CampaignDetailsContainerProps {
  campaign: CampaignDetails;
  loading?: boolean;
}

export function CampaignDetailsContainer({
  campaign,
  loading,
}: CampaignDetailsContainerProps) {
  const t = useTranslations('campaign');
  const theme = useTheme();
  const systemMeta = getGameSystemMeta(campaign.system);
  const { mutate: updateCampaignStatus, isPending } = useUpdateCampaignStatus();

  const actions = useMemo(
    () => getAvailableStatusActions(campaign),
    [campaign],
  );
  const { openModal, closeModal } = useModal();
  const tDelete = useTranslations('campaign.delete');

  const handleDeleteClick = useCallback(() => {
    if (campaign.id) {
      openModal(
        getDeleteModalConfig(tDelete, campaign.name, campaign.id, closeModal),
      );
    }
  }, [openModal, closeModal, tDelete, campaign.name, campaign.id]);

  const handleUpdateStatusClick = useCallback(
    (nextStatus: CampaignStatus) => {
      if (campaign.id) {
        updateCampaignStatus({ id: campaign.id, status: nextStatus });
      }
    },
    [campaign.id, updateCampaignStatus],
  );

  return (
    <Container direction="column" align="stretch">
      <Skeleton loading={loading}>
        <Breadcrumb
          segments={[
            { label: t('list.title'), href: '/campaigns' },
            { label: campaign.name },
          ]}
        />
      </Skeleton>
      <Card hero>
        <Container direction="column" align="stretch">
          <Container align="start" justify="space-between">
            <Container align="center">
              <Skeleton loading={loading}>
                <GameSystemIcon system={campaign.system} />
              </Skeleton>
              <Container direction="column" compact>
                <Container align="center">
                  <Skeleton loading={loading}>
                    <Title order={3}>{campaign.name}</Title>
                  </Skeleton>
                  {!loading && campaign.dmed && <DmBadge />}
                  {!loading && <StatusBadge status={campaign.status} />}
                </Container>
                <Skeleton loading={loading}>
                  <Text variant="muted">{systemMeta.label}</Text>
                </Skeleton>
              </Container>
            </Container>
            {[CampaignStatus.DRAFT, CampaignStatus.ARCHIVED].includes(
              campaign.status,
            ) &&
              campaign.dmed && (
                <Button
                  icon={<Trash2 size={12} display="flex" />}
                  variant="outline"
                  buttonColor="danger"
                  text={t('actions.delete')}
                  onClick={handleDeleteClick}
                />
              )}
          </Container>
          {campaign.overview && (
            <Skeleton loading={loading}>
              <Quote>{campaign.overview}</Quote>
            </Skeleton>
          )}
          {!loading && campaign.dmed && (
            <>
              <Divider />
              <Container align="center">
                {actions.map((action) => (
                  <Button
                    variant="muted"
                    key={action.label}
                    text={t(action.label)}
                    icon={action.icon}
                    onClick={() => handleUpdateStatusClick(action.nextStatus)}
                    loading={isPending}
                  />
                ))}
                {actions.length > 0 && <Divider vertical />}
                {![CampaignStatus.PAUSED, CampaignStatus.ARCHIVED].includes(
                  campaign.status,
                ) && (
                  <InviteContainer
                    campaignId={campaign.id}
                    hash={campaign.inviteHash}
                  />
                )}
              </Container>
            </>
          )}
        </Container>
      </Card>
      {!loading && campaign.playerCount > 0 && (
        <Container direction="column" align="stretch">
          <Container align="center">
            <Users
              size={24}
              display="flex"
              color={theme.colors.primary.default}
            />
            <Title order={3}>
              {t('characters')} ({campaign.playerCount})
            </Title>
          </Container>
          {campaign.characters.map((character) => (
            <Card key={character.id}>
              <Container>
                <Title order={4}>{character.name}</Title>
              </Container>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
}
