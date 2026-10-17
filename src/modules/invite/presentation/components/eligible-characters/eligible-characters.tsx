import { Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ListState } from '@/src/design';
import { CreateCharacterButton, getCharacters } from '@/src/modules/character';
import { getGameSystemMeta } from '@/src/modules/rpg';
import { getCurrentUserOrNull, getDisplayName } from '@/src/modules/user';

import { getInvitePath, type Invite } from '../../../domain';
import { acceptInviteAction } from '../../invite.actions';
import { AcceptInviteForm } from '../accept-invite-form/accept-invite-form';

const MAX_ELIGIBLE = 100;

/** Fichas que podem entrar: as do usuário (mesmo sistema, sem campanha) e as prontas. */
export async function EligibleCharacters({ invite }: { invite: Invite }) {
  const [{ items: mine }, user, t] = await Promise.all([
    // Uma página com o máximo da API: a escolha é uma lista só, sem paginador
    getCharacters(
      { gameSystem: invite.campaignSystem, withoutCampaign: true },
      1,
      MAX_ELIGIBLE,
    ),
    getCurrentUserOrNull(),
    getTranslations(),
  ]);
  const premade = invite.premadeCharacters;
  const system = getGameSystemMeta(invite.campaignSystem).label;
  // Criar pelo convite volta para ele, com a ficha nova na lista
  const createCharacter = (
    <CreateCharacterButton
      label={t('invite.character.create')}
      variant="primary"
      returnTo={getInvitePath(invite.hash)}
    />
  );

  if (mine.length === 0 && premade.length === 0) {
    return (
      <ListState
        id="invite-empty"
        icon={<Users />}
        title={t('invite.empty.title')}
        message={t('invite.empty.message', {
          system,
          campaign: invite.campaignName,
        })}
        actions={createCharacter}
      />
    );
  }

  return (
    <AcceptInviteForm
      action={acceptInviteAction.bind(null, invite.hash)}
      campaignName={invite.campaignName}
      defaultPlayerName={user ? getDisplayName(user) : undefined}
      mine={mine}
      premade={premade}
      noneMine={
        mine.length === 0
          ? {
              message: t('invite.character.noneMine', { system }),
              action: (
                <CreateCharacterButton
                  label={t('invite.character.create')}
                  variant="ghost"
                  returnTo={getInvitePath(invite.hash)}
                />
              ),
            }
          : undefined
      }
    />
  );
}
