'use client';

import { Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useActionState } from 'react';

import { Stack, SubmitButton, Text } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

interface AcceptInviteFormProps {
  /** Server Action já vinculada ao hash do convite. */
  action: (
    state: FormState<'character'>,
    formData: FormData,
  ) => Promise<FormState<'character'>>;
  /** Seletor de personagem renderizado no servidor. */
  children: ReactNode;
}

export function AcceptInviteForm({ action, children }: AcceptInviteFormProps) {
  const t = useTranslations();
  const [state, formAction] = useActionState(
    action,
    initialFormState as FormState<'character'>,
  );
  useFormErrorToast(state, 'invite.toast.error.join');

  const characterError = state.fieldErrors?.character;

  return (
    <form action={formAction}>
      <Stack direction="column" align="stretch">
        {children}
        {characterError && (
          <Text tone="danger" small role="alert">
            {t(characterError)}
          </Text>
        )}
        <SubmitButton size="lg" icon={<Swords size={20} />}>
          {t('invite.join')}
        </SubmitButton>
      </Stack>
    </form>
  );
}
