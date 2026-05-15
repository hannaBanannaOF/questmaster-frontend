'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Container, Input, Select, TextArea } from '@/src/design';
import { getGameSystemSelectValues } from '@/src/modules/rpg';

import {
  CampaignCreateFormData,
  campaignCreateSchema,
} from '../../../domain/campaign.schema';
import { useCreateCampaign } from '../../campaign.hooks';

interface CreateCampaignFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CampaignCreateForm({
  onSuccess,
  onCancel,
}: CreateCampaignFormProps) {
  const t = useTranslations('campaign.create.form');

  const options = getGameSystemSelectValues();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignCreateFormData>({
    resolver: yupResolver(campaignCreateSchema),
  });
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const onSubmit = useCallback(
    (data: CampaignCreateFormData) => {
      createCampaign(data, { onSuccess });
    },
    [createCampaign, onSuccess],
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
        <Select
          label={t('game_system.label')}
          required
          showDefault
          options={options}
          {...register('game_system')}
          disabled={isPending}
          error={errors.game_system?.message && t(errors.game_system.message)}
        />
        <TextArea
          label={t('overview.label')}
          placeholder={t('overview.placeholder')}
          {...register('overview')}
          disabled={isPending}
          error={errors.overview?.message && t(errors.overview.message)}
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
      <CampaignCreateForm onSuccess={closeModal} onCancel={closeModal} />
    ),
  };
}
