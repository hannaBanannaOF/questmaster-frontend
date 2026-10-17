import { getTranslations } from 'next-intl/server';

import { DetailPage } from '@/src/design';
import { InviteBlock } from '@/src/modules/invite/presentation/components/invite-block/invite-block';
import { InviteLinkControl } from '@/src/modules/invite/presentation/components/invite-link-control/invite-link-control';
import { createInviteAction } from '@/src/modules/invite/presentation/invite.actions';

import { canInviteToCampaign, canManageCampaign } from '../../domain';
import { getCampaignBySlug } from '../campaign.loaders';
import { CampaignHeader } from '../components/campaign-detail/campaign-header';
import { PartySection } from '../components/campaign-detail/party-section';
import { PremadeSection } from '../components/campaign-detail/premade-section';

/** Uma coluna em todas as larguras: voltar → cabeçalho → convite → Party → Fichas prontas. */
export async function CampaignDetailsView({ slug }: { slug: string }) {
  const [campaign, t] = await Promise.all([
    getCampaignBySlug(slug),
    getTranslations('campaign.detail'),
  ]);

  const isManager = canManageCampaign(campaign);
  const canInvite = canInviteToCampaign(campaign);
  const createInvite = createInviteAction.bind(null, campaign.id);
  const showParty = campaign.playerCount > 0 || canInvite;
  const showPremade =
    isManager && (canInvite || campaign.premadeCharacters.length > 0);

  return (
    <DetailPage back={{ href: '/campaigns', label: t('back') }}>
      <CampaignHeader campaign={campaign} />
      {canInvite && campaign.inviteHash && (
        <InviteBlock hash={campaign.inviteHash} createInvite={createInvite} />
      )}
      {showParty && (
        <PartySection
          campaign={campaign}
          hasInvite={Boolean(campaign.inviteHash)}
          emptyAction={
            canInvite &&
            !campaign.inviteHash && (
              <InviteLinkControl createInvite={createInvite} />
            )
          }
        />
      )}
      {showPremade && (
        <PremadeSection campaign={campaign} canCreate={canInvite} />
      )}
    </DetailPage>
  );
}
