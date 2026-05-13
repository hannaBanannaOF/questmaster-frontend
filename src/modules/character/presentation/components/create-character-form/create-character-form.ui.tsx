'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Container, Input, Select } from '@/src/design';
import { getGameSystemSelectValues } from '@/src/modules/rpg';

import {
  CharacterCreateFormData,
  characterCreateSchema,
} from '../../../domain/character.schema';
import { useCreateCharacter } from '../../character.hooks';

interface CreateCharacterFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CharacterCreateForm({
  onSuccess,
  onCancel,
}: CreateCharacterFormProps) {
  const t = useTranslations('character.create.form');

  const options = getGameSystemSelectValues();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CharacterCreateFormData>({
    resolver: yupResolver(characterCreateSchema),
  });
  const { mutate: createCharacter, isPending } = useCreateCharacter();

  const onSubmit = useCallback(
    (data: CharacterCreateFormData) => {
      createCharacter(data, { onSuccess });
    },
    [createCharacter, onSuccess],
  );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Container direction="column" align="stretch">
        <Input
          label={t('name.label')}
          placeholder={t('name.placeholder')}
          required
          {...register('name')}
          disabled={isPending}
          error={errors.name?.message && t(errors.name.message)}
        />
        <Input
          label={t('hp.label')}
          placeholder={t('hp.placeholder')}
          required
          type="number"
          min={1}
          {...register('hp', { valueAsNumber: true })}
          disabled={isPending}
          error={errors.hp?.message && t(errors.hp.message)}
        />
        <Select
          label={t('game_system.label')}
          required
          showDefault
          options={options}
          {...register('game_system')}
          disabled={isPending}
          error={errors.game_system?.message && t(errors.game_system.message)}
        />
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
            icon={<Plus display="flex" />}
            loading={isPending}
          />
        </Container>
      </Container>
    </form>
  );
}

export function getCreateModalConfig(
  t: (key: string) => string,
  closeModal: () => void,
) {
  return {
    title: t('title'),
    subtitle: t('subtitle'),
    content: (
      <CharacterCreateForm onSuccess={closeModal} onCancel={closeModal} />
    ),
  };
}
