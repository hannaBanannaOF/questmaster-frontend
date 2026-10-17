import { Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Surface } from '@/src/design';

import styles from '../../dashboard.module.css';

/** Fichas criadas, nenhuma em mesa: explica o convite no lugar do destaque. */
export function ReadyCard() {
  const t = useTranslations('dashboard.player.ready');

  return (
    <Surface
      as="article"
      variant="secondary"
      className={styles.ready}
      aria-labelledby="dashboard-ready"
    >
      <span className={styles.indicator} aria-hidden>
        <Link2 />
      </span>
      <div className={styles.readyBody}>
        <span className={styles.eyebrow}>{t('eyebrow')}</span>
        <h2 id="dashboard-ready">{t('title')}</h2>
        <p className={styles.muted}>{t('message')}</p>
      </div>
    </Surface>
  );
}
