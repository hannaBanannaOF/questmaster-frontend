'use client';

import { Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useId } from 'react';

import { Stack, SubmitButton, Text } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import type { CharacterSummary } from '@/src/modules/character/domain';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { CharacterPicker } from '../character-picker/character-picker';

interface AcceptInviteFormProps {
  /** Server Action já vinculada ao hash do convite. */
  action: (
    state: FormState<'character'>,
    formData: FormData,
  ) => Promise<FormState<'character'>>;
  /** Grupos de fichas que podem entrar; juntos formam uma única escolha. */
  groups: { legend: string; characters: CharacterSummary[] }[];
}

export function AcceptInviteForm({ action, groups }: AcceptInviteFormProps) {
  const t = useTranslations();
  const errorId = useId();
  const [state, formAction] = useActionState(
    action,
    initialFormState as FormState<'character'>,
  );
  useFormErrorToast(state, 'invite.toast.error.join');

  const characterError = state.fieldErrors?.character;

  // noValidate: a action valida e responde com a mensagem do app, no lugar
  // do balão nativo, que aparecia preso ao rádio escondido
  return (
    <form action={formAction} noValidate>
      <Stack direction="column" align="stretch">
        {groups.map((group) => (
          <CharacterPicker
            key={group.legend}
            characters={group.characters}
            // Mesmo name em todos os grupos: um rádio marcado no form inteiro
            name="character"
            legend={group.legend}
            // O React limpa o form depois da action; isso devolve a escolha
            defaultValue={state.values?.character}
            errorId={characterError ? errorId : undefined}
          />
        ))}
        {characterError && (
          <Text tone="danger" small role="alert" id={errorId}>
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
