import { Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { EmptyState, Loader } from '@/src/design';
import { getCharacters } from '@/src/modules/character';

import type { Invite } from '../../../domain';
import { acceptInviteAction } from '../../invite.actions';
import { AcceptInviteForm } from '../accept-invite-form/accept-invite-form';

const MAX_ELIGIBLE = 100;

/** Fichas que podem entrar: as do usuário (mesmo sistema, sem campanha) e as prontas. */
export async function EligibleCharacters({ invite }: { invite: Invite }) {
  const [{ items: characters }, t] = await Promise.all([
    // Uma página com o máximo da API: a escolha é uma lista só, sem paginador
    getCharacters(
      { gameSystem: invite.campaignSystem, withoutCampaign: true },
      1,
      MAX_ELIGIBLE,
    ),
    getTranslations(),
  ]);

  const groups = [
    { legend: t('invite.character.mine'), characters },
    {
      legend: t('invite.character.premade'),
      characters: invite.premadeCharacters,
    },
  ].filter((group) => group.characters.length > 0);

  if (groups.length === 0) {
    return (
      <EmptyState
        title={t('character.list.empty.title')}
        message={t('character.list.empty.message')}
        icon={<Users size={48} />}
      />
    );
  }

  return (
    <AcceptInviteForm
      action={acceptInviteAction.bind(null, invite.hash)}
      groups={groups}
    />
  );
}

export async function EligibleCharactersFallback() {
  const t = await getTranslations('character.list');
  return <Loader message={t('loading')} />;
}
