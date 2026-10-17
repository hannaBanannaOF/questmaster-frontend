import { useTranslations } from 'next-intl';

import { DetailPage } from '@/src/design';

import styles from './character-sheet.module.css';

const Block = ({ w, h }: { w: string; h: string }) => (
  <span className={styles.sk} style={{ width: w, height: h }} />
);

/** Carregamento com a forma da ficha: voltar, cabeçalho e a linha da campanha. */
export function CharacterSheetSkeleton() {
  const t = useTranslations('character.detail');

  return (
    <DetailPage>
      <div aria-busy="true">
        <p className="visually-hidden" role="status">
          {t('loading')}
        </p>
        <div className={styles.skeleton} aria-hidden>
          <Block w="7rem" h="1rem" />
          <div className={styles.skHero}>
            <Block w="4.5rem" h="4.5rem" />
            <div className={styles.skStack}>
              <Block w="8rem" h="0.75rem" />
              <Block w="min(18rem, 80%)" h="2rem" />
              <Block w="5rem" h="1.25rem" />
            </div>
          </div>
          <Block w="7rem" h="1.5rem" />
          <Block w="100%" h="4.75rem" />
        </div>
      </div>
    </DetailPage>
  );
}
