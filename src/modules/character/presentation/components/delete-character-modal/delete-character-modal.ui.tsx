'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button, Container, Text, useModal } from '@/src/design';

import { useDeleteCharacter } from '../../character.hooks';

export function useDeleteModal(name: string, id?: number) {
  if (id === undefined) {
    throw Error('Invalid id!');
  }
  const { closeModal } = useModal();
  const t = useTranslations('character.delete');
  const router = useRouter();
  const { mutate, isPending } = useDeleteCharacter();

  return {
    title: t('title'),
    content: (
      <Container align="stretch" direction="column">
        <Text>{t.rich('confirm', {
          name: name,
          bold: (chunks) => <strong>{chunks}</strong>
        })}</Text>
        <Container align='stretch' justify='end'>
          <Button type='button' variant='text' onClick={closeModal} text={t('cancel')} disabled={isPending}/>
          <Button text={t('submit')} buttonColor='danger' loading={isPending} onClick={() => {
            mutate({id: id, name: name}, {
              onSuccess: () => {
                closeModal();
                router.back();
              }
            });
          }}/>
        </Container>
      </Container>
    )
  }; 
};