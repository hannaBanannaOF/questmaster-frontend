import { useTranslations } from 'next-intl';

import { DetailPage } from '@/src/design';

import styles from './campaign-detail.module.css';

const Block = ({ w, h }: { w: string; h: string }) => (
  <span className={styles.sk} style={{ width: w, height: h }} />
);

/** Carregamento com a forma da página: voltar, cabeçalho e a grade da party. */
export function CampaignDetailSkeleton() {
  const t = useTranslations('campaign.detail');

  return (
    <DetailPage>
      <div aria-busy="true">
        <p className="visually-hidden" role="status">
          {t('loading')}
        </p>
        <div className={`${styles.skPage} ${styles.skeleton}`} aria-hidden>
          <Block w="7rem" h="1rem" />
          <div className={`${styles.skCard} ${styles.skHero}`}>
            <Block w="10rem" h="2.75rem" />
            <Block w="min(22rem, 80%)" h="2rem" />
            <Block w="12rem" h="1rem" />
          </div>
          <Block w="6rem" h="1.5rem" />
          <ul className={styles.grid}>
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className={styles.skCard}>
                <Block w="3rem" h="3rem" />
                <Block w="70%" h="1rem" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DetailPage>
  );
}
