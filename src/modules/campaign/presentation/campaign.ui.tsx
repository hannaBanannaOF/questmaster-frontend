import {
  Archive,
  Check,
  ChevronRight,
  Copy,
  Crown,
  Link2,
  Pause,
  Play,
  Users,
} from 'lucide-react';
import { default as NextLink } from 'next/link';
import { useTranslations } from 'next-intl';
import { ClipboardEvent, ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import {
  Breadcrumb,
  Button,
  Card,
  Container,
  Divider,
  IconSpan,
  Quote,
  Skeleton,
  Text,
  Title,
} from '@/src/design/design-system';

import { getGameSystemMeta } from '../../rpg/presentation/game-system.meta';
import { GameSystemIcon } from '../../rpg/presentation/game-system.ui';
import { Campaign, CampaignDetails } from '../domain/campaign.types';
import { CampaignStatus } from '../domain/campaign-status.types';
import { useUpdateCampaignStatus } from './campaign.hooks';
import * as S from './campaign.styles';
import { getCampaignStatusMeta } from './campaign-status.meta';

function DmBadge() {
  const theme = useTheme();
  const t = useTranslations('campaign');

  return (
    <IconSpan
      color={theme.colors.primary.default}
      icon={<Crown size={20} display="flex" />}
      data={t('dm')}
    />
  );
}

export function CampaignListCard({ campaign }: { campaign: Campaign }) {
  const t = useTranslations('campaign');
  const theme = useTheme();
  const statusMeta = getCampaignStatusMeta(campaign.status);
  const systemMeta = getGameSystemMeta(campaign.system);
  return (
    <NextLink href={`/campaigns/${campaign.slug}`}>
      <Card>
        <Container align="center" justify="space-between">
          <Container>
            <GameSystemIcon system={campaign.system} />
            <Container direction="column">
              <Container direction="column" compact>
                <Container>
                  <Title order={3}>{campaign.name}</Title>
                  {campaign.dmed && <DmBadge />}
                </Container>
                <Text muted>{systemMeta.label}</Text>
              </Container>
              <Container align="center">
                <S.StatusBadge $status={campaign.status}>
                  {t(statusMeta.translationLabel)}
                </S.StatusBadge>
                {campaign.playerCount > 0 && (
                  <IconSpan
                    color={theme.colors.text.muted}
                    icon={<Users size={16} display="flex" />}
                    data={campaign.playerCount}
                  />
                )}
              </Container>
            </Container>
          </Container>
          <ChevronRight display="flex" />
        </Container>
      </Card>
    </NextLink>
  );
}

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

function CampaignInviteContainer({ hash }: { hash: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const t = useTranslations('campaign.invite');

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const getFullUrl = () => `${window.location.origin}/join/${hash}`;

  const handleButtonClick = async () => {
    await navigator.clipboard.writeText(getFullUrl());
    setCopied(true);
  };

  const handleCopyEvent = (e: ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const fullUrl = getFullUrl();
    e.clipboardData.setData('text/plain', fullUrl);
    setCopied(true);
  };

  return (
    <S.InviteHashWrapper>
      <S.InviteHashSpan onCopy={handleCopyEvent}>/join/{hash}</S.InviteHashSpan>

      <S.InviteHashCopyButton onClick={handleButtonClick} disabled={copied}>
        {copied ? (
          <>
            <Check size={12} display="flex" />
            {t('copied')}
          </>
        ) : (
          <>
            <Copy size={12} display="flex" />
            {t('copy')}
          </>
        )}
      </S.InviteHashCopyButton>
    </S.InviteHashWrapper>
  );
}

export function CampaignDetailsContainer({
  campaign,
  loading,
}: {
  campaign: CampaignDetails;
  loading?: boolean;
}) {
  const t = useTranslations('campaign');
  const theme = useTheme();
  const systemMeta = getGameSystemMeta(campaign.system);
  const statusMeta = getCampaignStatusMeta(campaign.status);
  const { mutate: updateStatus } = useUpdateCampaignStatus();
  const actions = getAvailableStatusActions(campaign);

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
      <Card hover={false} hero>
        <Container direction="column" align="stretch">
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
                {!loading && (
                  <S.StatusBadge $status={campaign.status}>
                    {t(statusMeta.translationLabel)}
                  </S.StatusBadge>
                )}
              </Container>
              <Skeleton loading={loading}>
                <Text muted>{systemMeta.label}</Text>
              </Skeleton>
            </Container>
          </Container>
          {campaign.overview && (
            <Skeleton loading={loading}>
              <Quote>{campaign.overview}</Quote>
            </Skeleton>
          )}
          {!loading && campaign.dmed && actions.length > 0 && (
            <>
              <Divider />
              <Container align="center">
                {actions.map((action) => (
                  <Button
                    variant="muted"
                    key={action.label}
                    text={t(action.label)}
                    icon={action.icon}
                    onClick={() => {
                      updateStatus({
                        id: campaign.id,
                        status: action.nextStatus,
                      });
                    }}
                  />
                ))}
                <Divider vertical />
                {!campaign.inviteHash && (
                  <Button
                    icon={<Link2 size={12} display="flex" />}
                    variant="outline"
                    text={t('invite.create')}
                  />
                )}
                {campaign.inviteHash && (
                  <CampaignInviteContainer hash={campaign.inviteHash ?? ''} />
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
            <Card hover={false} key={character.id}>
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
