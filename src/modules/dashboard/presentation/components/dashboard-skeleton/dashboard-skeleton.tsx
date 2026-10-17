import { useTranslations } from 'next-intl';

import styles from '../../dashboard.module.css';

const Block = ({ w, h, round }: { w: string; h: string; round?: boolean }) => (
  <span
    className={styles.sk}
    style={{ width: w, height: h }}
    data-round={round || undefined}
  />
);

/** Carregamento com a forma da tela: título, destaque, grade de fichas e linhas. */
export function DashboardSkeleton() {
  const t = useTranslations('dashboard');

  return (
    <div className={styles.page} aria-busy="true">
      <h1 className="visually-hidden">{t('title')}</h1>
      <p className="visually-hidden" role="status">
        {t('loading')}
      </p>
      <div className={styles.skGroup} aria-hidden>
        <div className={styles.hello}>
          <div className={styles.skStack}>
            <Block w="14rem" h="2rem" />
            <Block w="10rem" h="1rem" />
          </div>
        </div>
        <div className={styles.skHero}>
          <Block w="9rem" h="0.75rem" />
          <Block w="min(22rem, 80%)" h="1.75rem" />
          <Block w="12rem" h="1rem" />
        </div>
        <div className={styles.columns}>
          <div className={styles.section}>
            <Block w="9rem" h="1.5rem" />
            <ul className={styles.characters}>
              {[0, 1, 2].map((i) => (
                <li key={i} className={styles.skCard}>
                  <Block w="7rem" h="0.75rem" />
                  <div className={styles.skRow}>
                    <Block w="3rem" h="3rem" round />
                    <Block w="60%" h="1rem" />
                  </div>
                  <Block w="70%" h="0.75rem" />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <Block w="9rem" h="1.5rem" />
            <ul className={styles.rows}>
              {[0, 1].map((i) => (
                <li key={i} className={styles.skCard}>
                  <div className={styles.skRow}>
                    <Block w="2.75rem" h="2.75rem" round />
                    <div className={styles.skStack}>
                      <Block w="12rem" h="1rem" />
                      <Block w="8rem" h="0.75rem" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
