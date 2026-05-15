import { Heart, Scroll, Swords, UserCheck, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useTheme } from 'styled-components';

import {
  Button,
  Card,
  Container,
  EmptyState,
  IconSpan,
  List,
  Loader,
  Quote,
  Skeleton,
  Text,
  Title,
} from '@/src/design';
import { useCharacters } from '@/src/modules/character';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { Invite } from '../../../domain/invite.types';
import { useAcceptInvite } from '../../intive.hooks';
import * as S from './invite-details-container.styles';

interface InviteDetailsContainerProps {
  invite: Invite;
  loading?: boolean;
}

export function InviteDetailsContainer({
  invite,
  loading,
}: InviteDetailsContainerProps) {
  const gameSystemMeta = getGameSystemMeta(invite.campaignSystem);
  const theme = useTheme();

  const t = useTranslations('invite');
  const characterListT = useTranslations('character.list');

  const { data, isFetching } = useCharacters({
    game_system: invite.campaignSystem,
    without_campaign: true,
  });

  const { mutate: acceptInvite, isPending } = useAcceptInvite();
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleSelectCharacter = useCallback(
    (slug: string) => {
      if (isPending) return;
      setSelectedSlug(slug);
    },
    [setSelectedSlug, isPending],
  );

  const handleAcceptInvite = useCallback(() => {
    if (selectedSlug) {
      acceptInvite(
        {
          hash: invite.inviteHash,
          characterSlug: selectedSlug,
          campaignName: invite.campaignName,
        },
        {
          onSuccess: () => {
            router.push(`/campaigns/${invite.campaignSlug}`);
          },
        },
      );
    }
  }, [
    selectedSlug,
    acceptInvite,
    invite.campaignName,
    invite.inviteHash,
    invite.campaignSlug,
    router,
  ]);

  return (
    <Container direction="column" align="center">
      <Container direction="column" align="stretch">
        <Card hero>
          <Container align="center" direction="column">
            <S.ScrollIcon>
              <Scroll display="flex" size={24} />
            </S.ScrollIcon>
            <Skeleton loading={loading}>
              <Text variant="muted" uppercase>
                {t('invited')}
              </Text>
              <Title>{invite.campaignName}</Title>
            </Skeleton>
            <Skeleton loading={loading}>
              <Container align="center">
                <GameSystemIcon system={invite.campaignSystem} />
                <Text variant="muted" small>
                  {gameSystemMeta.label}
                </Text>
                {invite.campaignPlayerCount > 0 && (
                  <>
                    <Text variant="muted" small>
                      •
                    </Text>
                    <Container align="center" compact>
                      <Users
                        size={12}
                        display="flex"
                        color={theme.colors.text.muted}
                      />
                      <Text variant="muted" small>
                        {invite.campaignPlayerCount}
                      </Text>
                    </Container>
                  </>
                )}
              </Container>
            </Skeleton>
            {!loading && invite.campaignOverview && (
              <Quote>{invite.campaignOverview}</Quote>
            )}
          </Container>
        </Card>
        <Title order={3}>{t('character.choose')}</Title>
        {!isFetching && data && data.length > 0 && (
          <Container direction="column" align="stretch">
            <List>
              {data.map((c) => (
                <S.CharacterCard
                  key={c.slug}
                  onClick={() => handleSelectCharacter(c.slug)}
                  $selected={c.slug === selectedSlug}
                >
                  <Container justify="space-between" align="center">
                    <Container direction="column" compact>
                      <Title order={4}>{c.name}</Title>
                      {c.currentHp !== undefined && (
                        <IconSpan
                          data={characterListT('hp', { value: c.currentHp })}
                          icon={<Heart size={12} />}
                          color={theme.colors.text.muted}
                        />
                      )}
                    </Container>
                    {c.slug === selectedSlug && (
                      <UserCheck
                        display="flex"
                        size={20}
                        color={theme.colors.primary.default}
                      />
                    )}
                  </Container>
                </S.CharacterCard>
              ))}
            </List>
            <Button
              disabled={!selectedSlug || isPending}
              loading={isPending}
              text={
                <Title order={3} variant="contrast">
                  {t('join')}
                </Title>
              }
              icon={<Swords display="flex" size={20} />}
              onClick={handleAcceptInvite}
            />
          </Container>
        )}
        {!isFetching && (!data || data.length === 0) && (
          <Container direction="column" align="stretch">
            <EmptyState
              title={characterListT('empty.title')}
              message={characterListT('empty.message')}
              icon={<Users size={48} display="flex" />}
            />
          </Container>
        )}
        {isFetching && <Loader />}
      </Container>
    </Container>
  );
}
