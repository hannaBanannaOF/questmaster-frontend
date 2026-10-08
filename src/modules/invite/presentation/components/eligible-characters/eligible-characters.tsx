import { Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { EmptyState, Loader } from '@/src/design';
import { getCharacters } from '@/src/modules/character';

import type { Invite } from '../../../domain';
import { acceptInviteAction } from '../../invite.actions';
import { AcceptInviteForm } from '../accept-invite-form/accept-invite-form';
import { CharacterPicker } from '../character-picker/character-picker';

/** Fichas do usuário que podem entrar na campanha (mesmo sistema, sem campanha). */
export async function EligibleCharacters({ invite }: { invite: Invite }) {
  const [characters, t] = await Promise.all([
    getCharacters({
      gameSystem: invite.campaignSystem,
      withoutCampaign: true,
    }),
    getTranslations(),
  ]);

  if (characters.length === 0) {
    return (
      <EmptyState
        title={t('character.list.empty.title')}
        message={t('character.list.empty.message')}
        icon={<Users size={48} />}
      />
    );
  }

  return (
    <AcceptInviteForm action={acceptInviteAction.bind(null, invite.hash)}>
      <CharacterPicker
        characters={characters}
        name="character"
        legend={t('invite.character.choose')}
      />
    </AcceptInviteForm>
  );
}

export async function EligibleCharactersFallback() {
  const t = await getTranslations('character.list');
  return <Loader message={t('loading')} />;
}
