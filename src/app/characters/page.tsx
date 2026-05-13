'use client';

import { Plus, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import {
  Button,
  Container,
  EmptyState,
  List,
  Loader,
  Title,
  useModal,
  useToast,
} from '@/src/design';
import {
  CharacterListCard,
  getCreateModalConfig,
  useCharacters,
} from '@/src/modules/character';

export default function CharacterListPage() {
  const t = useTranslations('character.list');
  const toastT = useTranslations('character.toast');
  const { data, isFetching, isError } = useCharacters();

  const searchParams = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    const error = searchParams.get('errorMsg');
    if (error) {
      addToast(toastT('error.detail'), error, 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, addToast, toastT]);

  const { openModal, closeModal } = useModal();
  const createT = useTranslations('character.create');
  const createModal = getCreateModalConfig(createT, closeModal);

  const handleCreateCharacterClick = useCallback(() => {
    openModal(createModal);
  }, [openModal, createModal]);

  return (
    <Container direction="column" align="stretch">
      <Container justify="space-between">
        <Title order={2}>{t('title')}</Title>
        {!isError && !isFetching && (
          <Button
            icon={<Plus display="flex" size={20} />}
            text={t('new')}
            onClick={handleCreateCharacterClick}
          />
        )}
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
            !isError && (
              <Button
                icon={<Plus display="flex" size={20} />}
                text={t('empty.create')}
                onClick={handleCreateCharacterClick}
              />
            )
          }
        />
      )}
    </Container>
  );
}
