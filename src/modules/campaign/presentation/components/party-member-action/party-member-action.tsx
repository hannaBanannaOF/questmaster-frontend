import { LogOut, UserMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ConfirmDeleteButton } from '@/src/modules/shared/presentation';

import {
  type CampaignCharacter,
  type CampaignDetails,
  canLeaveCampaign,
  canRemoveFromCampaign,
} from '../../../domain';
import {
  leaveCampaignAction,
  removeFromCampaignAction,
} from '../../campaign.actions';

/** "Sair da campanha" na ficha do usuário ou "Remover" para o DM; nada nos outros casos. */
export function PartyMemberAction({
  campaign,
  character,
}: {
  campaign: Pick<CampaignDetails, 'id' | 'slug' | 'isDm' | 'status'>;
  character: CampaignCharacter;
}) {
  const t = useTranslations();
  const labels = (key: 'leave' | 'remove') => ({
    trigger: t(`campaign.party.${key}.trigger`),
    title: t(`campaign.party.${key}.title`),
    confirm: t(`campaign.party.${key}.submit`),
    cancel: t(`campaign.party.${key}.cancel`),
    close: t('common.actions.close'),
  });
  const description = (key: 'leave' | 'remove') =>
    t.rich(`campaign.party.${key}.confirm`, {
      name: character.name,
      bold: (chunks) => <strong>{chunks}</strong>,
    });

  if (canRemoveFromCampaign(campaign)) {
    return (
      <ConfirmDeleteButton
        action={removeFromCampaignAction.bind(
          null,
          campaign.id,
          campaign.slug,
          character.id,
        )}
        errorTitleKey="campaign.party.toast.error.remove"
        icon={<UserMinus size={12} />}
        labels={labels('remove')}
        description={description('remove')}
      />
    );
  }

  if (character.isMine && character.slug && canLeaveCampaign(campaign)) {
    return (
      <ConfirmDeleteButton
        action={leaveCampaignAction.bind(
          null,
          campaign.id,
          character.id,
          character.slug,
        )}
        errorTitleKey="campaign.party.toast.error.leave"
        icon={<LogOut size={12} />}
        labels={labels('leave')}
        description={description('leave')}
      />
    );
  }

  return null;
}
