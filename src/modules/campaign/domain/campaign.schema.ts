import * as yup from 'yup';

export const campaignCreateSchema = yup.object({
  name: yup.string().required('name.errors.required'),
  overview: yup.string().defined(),
  game_system: yup.string().required('game_system.errors.required'),
});

export type CampaignCreateFormData = yup.InferType<typeof campaignCreateSchema>;
