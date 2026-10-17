import { useTranslations } from 'next-intl';

import { DetailPage } from '@/src/design';

import styles from '../../views/invite.module.css';

const Block = ({ w, h }: { w: string; h: string }) => (
  <span className={styles.sk} style={{ width: w, height: h }} />
);

/** Carregamento com a forma do convite: destaque e cards de ficha. */
export function InviteSkeleton({ picksOnly }: { picksOnly?: boolean }) {
  const t = useTranslations('invite');

  const picks = (
    <div className={styles.skGrid}>
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.skCard}>
          <Block w="3rem" h="3rem" />
          <Block w="70%" h="1rem" />
          <Block w="50%" h="0.75rem" />
        </div>
      ))}
    </div>
  );

  const body = (
    <div aria-busy="true">
      <p className="visually-hidden" role="status">
        {t('loading')}
      </p>
      <div className={styles.skeleton} aria-hidden>
        {!picksOnly && (
          <div className={styles.skHero}>
            <Block w="12rem" h="0.75rem" />
            <Block w="min(20rem, 80%)" h="2rem" />
            <Block w="10rem" h="1rem" />
          </div>
        )}
        <Block w="12rem" h="1.5rem" />
        {picks}
      </div>
    </div>
  );

  if (picksOnly) return body;
  return (
    <div className={styles.page}>
      <DetailPage>{body}</DetailPage>
    </div>
  );
}
