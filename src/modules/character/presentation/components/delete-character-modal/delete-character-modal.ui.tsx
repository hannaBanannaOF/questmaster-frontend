'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { Button, Container, Text } from '@/src/design';

import { useDeleteCharacter } from '../../character.hooks';

interface DeleteCharacterConfirmationProps {
  id: number;
  name: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function DeleteCharacterConfirmation({
  id,
  name,
  onSuccess,
  onCancel,
}: DeleteCharacterConfirmationProps) {
  const t = useTranslations('campaign.delete');
  const router = useRouter();
  const { mutate: deleteCharacter, isPending } = useDeleteCharacter();

  const handleDeleteClick = useCallback(() => {
    deleteCharacter(
      { id, name },
      {
        onSuccess: () => {
          onSuccess();
          router.back();
        },
      },
    );
  }, [deleteCharacter, id, name, onSuccess, router]);

  return (
    <Container align="stretch" direction="column">
      <Text>
        {t.rich('confirm', {
          name: name,
          bold: (chunks) => <strong>{chunks}</strong>,
        })}
      </Text>
      <Container align="stretch" justify="end">
        <Button
          type="button"
          variant="text"
          onClick={onCancel}
          text={t('cancel')}
          disabled={isPending}
        />
        <Button
          text={t('submit')}
          buttonColor="danger"
          loading={isPending}
          onClick={handleDeleteClick}
        />
      </Container>
    </Container>
  );
}

export function getDeleteModalConfig(
  t: (key: string) => string,
  name: string,
  id: number,
  closeModal: () => void,
) {
  return {
    title: t('title'),
    content: (
      <DeleteCharacterConfirmation
        id={id}
        name={name}
        onSuccess={closeModal}
        onCancel={closeModal}
      />
    ),
  };
}
