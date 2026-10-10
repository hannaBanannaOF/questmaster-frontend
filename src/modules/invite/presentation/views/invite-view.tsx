import { ArrowRight, Crown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ButtonLink, EmptyState, Stack, Title } from '@/src/design';

import {
  EligibleCharacters,
  EligibleCharactersFallback,
} from '../components/eligible-characters/eligible-characters';
import { InviteSummary } from '../components/invite-summary/invite-summary';
import { getInvite } from '../invite.loaders';
import styles from './invite-view.module.css';

export async function InviteView({ hash }: { hash: string }) {
  const [invite, t] = await Promise.all([
    getInvite(hash),
    getTranslations('invite'),
  ]);

  return (
    <Stack direction="column" align="stretch" className={styles.page}>
      <InviteSummary invite={invite} />
      {invite.isDm ? (
        // O mestre pode abrir o link pra conferir, mas não entra como jogador
        <EmptyState
          title={t('dm.title')}
          message={t('dm.message')}
          icon={<Crown size={48} />}
          action={
            <ButtonLink
              href={`/campaigns/${invite.campaignSlug}`}
              variant="outline"
              icon={<ArrowRight size={16} />}
            >
              {t('dm.action')}
            </ButtonLink>
          }
        />
      ) : (
        <>
          <Title order={3}>{t('character.choose')}</Title>
          {/* O convite aparece na hora; as fichas chegam por streaming */}
          <Suspense fallback={<EligibleCharactersFallback />}>
            <EligibleCharacters invite={invite} />
          </Suspense>
        </>
      )}
    </Stack>
  );
}
