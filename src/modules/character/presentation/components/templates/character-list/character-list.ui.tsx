'use client';
import { Plus, Scroll } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, Container, EmptyState, List, Title } from '@/src/design';
import { Character } from '@/src/modules/character/domain';

import { CharacterListCard } from '../../molecules';

interface CharacterListProps {
  characters?: Character[];
  hasError?: boolean;
  onCreateCharacterClick(): void;
}

export function CharacterList({
  characters,
  hasError,
  onCreateCharacterClick,
}: CharacterListProps) {
  const t = useTranslations('character.list');

  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        {!hasError && (
          <Button
            icon={<Plus display="flex" size={20} />}
            text={t('new')}
            onClick={onCreateCharacterClick}
          />
        )}
      </Container>
      {characters && (
        <List>
          {characters.map((c) => (
            <CharacterListCard character={c} key={c.slug} />
          ))}
        </List>
      )}
      {(!characters || characters.length === 0) && (
        <EmptyState
          title={t('empty.title')}
          message={t('empty.message')}
          icon={<Scroll size={48} display="flex" />}
          extra={
            !hasError && (
              <Button
                icon={<Plus display="flex" size={20} />}
                text={t('empty.create')}
                onClick={onCreateCharacterClick}
              />
            )
          }
        />
      )}
    </Container>
  );
}
