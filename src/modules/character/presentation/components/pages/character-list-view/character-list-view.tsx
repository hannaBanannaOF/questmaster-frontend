'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import { useModal, useToast } from '@/src/design';
import { useCharacters } from '@/src/modules/character';

import { getCreateModalConfig } from '../../organisms';
import { CharacterList } from '../../templates/character-list/character-list.ui';

export function CharacterListView() {
  const toastT = useTranslations('character.toast');
  const { data, isError } = useCharacters();

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
    <CharacterList
      characters={data}
      hasError={isError}
      onCreateCharacterClick={handleCreateCharacterClick}
    />
  );
}
