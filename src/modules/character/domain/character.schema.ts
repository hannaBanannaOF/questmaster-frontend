import * as yup from 'yup';

export const characterCreateSchema = yup.object({
  name: yup.string().required('name.errors.required'),
  hp: yup.number().typeError('hp.errors.type').required('hp.errors.required').min(1, 'hp.errors.min'),
  game_system: yup.string().required('game_system.errors.required')
});

export type CharacterCreateFormData = yup.InferType<typeof characterCreateSchema>;