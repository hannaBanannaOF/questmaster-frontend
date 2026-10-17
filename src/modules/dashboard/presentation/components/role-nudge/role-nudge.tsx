import { Crown, Swords } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CreateCampaignButton } from '@/src/modules/campaign';
import { CreateCharacterButton } from '@/src/modules/character';

import type { DashboardTab } from '../../../domain';
import styles from '../../dashboard.module.css';

/** Convite discreto, no fim da página, para o papel que o usuário ainda não tem. */
export function RoleNudge({ role }: { role: DashboardTab }) {
  const t = useTranslations(`dashboard.nudge.${role}`);
  const Icon = role === 'dm' ? Crown : Swords;

  return (
    <aside className={styles.nudge} aria-label={t('title')}>
      <span className={styles.role} aria-hidden>
        <Icon />
      </span>
      <span className={styles.nudgeBody}>
        <strong>{t('title')}</strong>
        <span className={styles.muted}>{t('message')}</span>
      </span>
      {role === 'dm' ? (
        <CreateCampaignButton label={t('action')} variant="secondary" />
      ) : (
        <CreateCharacterButton label={t('action')} variant="secondary" />
      )}
    </aside>
  );
}
