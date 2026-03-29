'use client';

import { Plus, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Button,
  Container,
  EmptyState,
  List,
  Loader,
  Title,
} from '@/src/design/design-system';
import { useCharacter } from '@/src/modules/character/presentation/character.hooks';
import { CharacterListCard } from '@/src/modules/character/presentation/character.ui';

export default function CharacterListPage() {
  const t = useTranslations('character.list');
  const { data, isFetching } = useCharacter();
  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        <Button icon={<Plus display="flex" size={20} />} text={t('new')} />
      </Container>
      {isFetching && !data ? (
        <Loader size="lg" message={t('loading')} />
      ) : (
        <List>
          {data?.map((c) => (
            <CharacterListCard character={c} key={c.slug} />
          ))}
        </List>
      )}
      {!isFetching && (!data || data.length === 0) && (
        <EmptyState
          title={t('empty.title')}
          message={t('empty.message')}
          icon={<Users size={48} display="flex" />}
          extra={
            <Button
              icon={<Plus display="flex" size={20} />}
              text={t('empty.create')}
            />
          }
        />
      )}
    </Container>
  );
}
