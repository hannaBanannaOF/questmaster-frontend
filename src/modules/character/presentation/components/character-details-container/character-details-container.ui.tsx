import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Breadcrumb, Button, Card, Container, Skeleton, Text, Title, useModal } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { Character } from '../../../domain/character.types';
import { useUpdateHP } from '../../character.hooks';
import { useDeleteModal } from '../delete-character-modal/delete-character-modal.ui';
import { StatusBar } from '../status-bar/satus-bar.ui';

export function CharacterDetailContainer({
  character,
  loading,
}: {
  character: Character;
  loading?: boolean;
}) {
  const t = useTranslations('character');
  const { openModal } = useModal();
  const { mutate, isPending } = useUpdateHP();
  
  const systemMeta = getGameSystemMeta(character.system);
  const deleteModalData = useDeleteModal(character.name, character.id);

  const handleUpdateHP = (newValue: number) => {
    if (!character.id) return;
    mutate({ newHp: newValue, id: character.id });
  };

  const handleDeleteClick = () => {
    openModal(deleteModalData);
  };

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

      <Card hover={false} hero>
        <Container direction="column" align="stretch">
          <Container align="start" justify="space-between">
            <Container>
              <Skeleton loading={loading}>
                <GameSystemIcon system={character.system} />
              </Skeleton>
              
              <Container direction="column" compact>
                <Skeleton loading={loading}>
                  <Title order={2}>{character.name}</Title>
                </Skeleton>
                <Skeleton loading={loading}>
                  <Text variant="muted">{systemMeta.label}</Text>
                </Skeleton>
              </Container>
            </Container>

            {!loading && (
              <Button 
                text={t('actions.delete')}
                icon={<Trash2 size={14} />} 
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
            />
          </Skeleton>
        </Container>
      </Card>
    </Container>
  );
}