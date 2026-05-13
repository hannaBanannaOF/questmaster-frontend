import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import {
  Breadcrumb,
  Button,
  Card,
  Container,
  Skeleton,
  Text,
  Title,
  useModal,
} from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { CharacterDetail } from '../../../domain/character.types';
import { useUpdateHP } from '../../character.hooks';
import { getDeleteModalConfig } from '../delete-character-modal/delete-character-modal.ui';
import { StatusBar } from '../status-bar/satus-bar.ui';

interface CharacterDetailContainerProps {
  character: CharacterDetail;
  loading?: boolean;
}

export function CharacterDetailContainer({
  character,
  loading,
}: CharacterDetailContainerProps) {
  const t = useTranslations('character');
  const { openModal, closeModal } = useModal();
  const { mutate: updateHP, isPending } = useUpdateHP();

  const systemMeta = getGameSystemMeta(character.system);
  const tDelete = useTranslations('character.delete');
  const deleteModal = getDeleteModalConfig(
    tDelete,
    character.name,
    character.id,
    closeModal,
  );

  const handleUpdateHP = useCallback(
    (newValue: number) => {
      if (character.id) {
        updateHP({ newHp: newValue, id: character.id });
      }
    },
    [character.id, updateHP],
  );

  const handleDeleteClick = useCallback(() => {
    openModal(deleteModal);
  }, [openModal, deleteModal]);

  return (
    <Container direction="column" align="stretch">
      <Skeleton loading={loading}>
        <Breadcrumb
          segments={[
            { label: t('list.title'), href: '/characters' },
            { label: character.name },
          ]}
        />
      </Skeleton>

      <Card hero>
        <Container direction="column" align="stretch">
          <Container align="start" justify="space-between">
            <Container align="center">
              <Skeleton loading={loading}>
                <GameSystemIcon system={character.system} />
              </Skeleton>

              <Container direction="column" compact>
                <Skeleton loading={loading}>
                  <Title order={3}>{character.name}</Title>
                </Skeleton>
                <Skeleton loading={loading}>
                  <Text variant="muted">{systemMeta.label}</Text>
                </Skeleton>
              </Container>
            </Container>

            {!loading && character.isPlayer && (
              <Button
                text={t('actions.delete')}
                icon={<Trash2 size={12} display="flex" />}
                variant="outline"
                buttonColor="danger"
                onClick={handleDeleteClick}
              />
            )}
          </Container>

          <Skeleton loading={loading}>
            <StatusBar
              title={t('controls.hp')}
              value={character.currentHp ?? 0}
              max={character.maxHp ?? 100}
              onUpdate={handleUpdateHP}
              isUpdating={isPending}
              showControls={character.isPlayer}
            />
          </Skeleton>
        </Container>
      </Card>
    </Container>
  );
}
