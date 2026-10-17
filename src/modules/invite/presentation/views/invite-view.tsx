import { ArrowRight, Crown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ButtonLink, DetailPage, Surface } from '@/src/design';
import { SystemSeal } from '@/src/modules/rpg';

import { EligibleCharacters } from '../components/eligible-characters/eligible-characters';
import { InviteHero } from '../components/invite-hero/invite-hero';
import { InviteLinkControl } from '../components/invite-link-control/invite-link-control';
import { InviteSkeleton } from '../components/invite-skeleton/invite-skeleton';
import { getInvite } from '../invite.loaders';
import styles from './invite.module.css';

/** Uma decisão só, numa coluna estreita: a campanha e a escolha para entrar. */
export async function InviteView({ hash }: { hash: string }) {
  const [invite, t] = await Promise.all([
    getInvite(hash),
    getTranslations('invite'),
  ]);

  return (
    <div className={styles.page}>
      <DetailPage>
        <InviteHero invite={invite} />
        {invite.isDm ? (
          // O mestre confere o link, mas não entra como jogador
          <Surface
            as="section"
            className={styles.owner}
            aria-labelledby="invite-owner"
          >
            <div className={styles.ownerTop}>
              <SystemSeal
                system={invite.campaignSystem}
                badge={<Crown />}
                badgeTone="accent"
              />
              <div>
                <h2 id="invite-owner">{t('dm.title')}</h2>
                <p className={styles.muted}>
                  {t('dm.message', { campaign: invite.campaignName })}
                </p>
              </div>
            </div>
            <InviteLinkControl hash={invite.hash} />
            <div>
              <ButtonLink
                href={`/campaigns/${encodeURIComponent(invite.campaignSlug)}`}
                variant="primary"
              >
                {t('dm.action')}
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
            </div>
          </Surface>
        ) : (
          // O convite aparece na hora; as fichas chegam por streaming
          <Suspense fallback={<InviteSkeleton picksOnly />}>
            <EligibleCharacters invite={invite} />
          </Suspense>
        )}
      </DetailPage>
    </div>
  );
}
