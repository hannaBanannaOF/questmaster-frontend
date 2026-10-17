import { Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Surface } from '@/src/design';
import type { ActionResult } from '@/src/lib/actions';

import { InviteLinkControl } from '../invite-link-control/invite-link-control';
import styles from './invite-block.module.css';

/** Bloco "Convite" do detalhe da campanha: o link e "Copiar link". */
export function InviteBlock({
  hash,
  createInvite,
}: {
  hash: string;
  createInvite: () => Promise<ActionResult<string>>;
}) {
  const t = useTranslations('invite.block');

  return (
    <Surface
      as="section"
      className={styles.block}
      aria-labelledby="invite-title"
    >
      <div className={styles.label}>
        <span className={styles.indicator} aria-hidden>
          <Link2 />
        </span>
        <div>
          <h2 id="invite-title" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.description}>{t('description')}</p>
        </div>
      </div>
      <div className={styles.copy}>
        <InviteLinkControl hash={hash} createInvite={createInvite} />
      </div>
    </Surface>
  );
}
