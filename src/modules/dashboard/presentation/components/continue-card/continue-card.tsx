import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { ButtonLink, Surface } from '@/src/design';
import type { CampaignSummary } from '@/src/modules/campaign/domain';
import { SystemTag, SystemWatermark } from '@/src/modules/rpg';

import styles from '../../dashboard.module.css';

interface ContinueCardProps {
  campaign: CampaignSummary;
  eyebrow: string;
  action: string;
  /** Linha de baixo: a ficha do jogador ou o status e a party do mestre. */
  children: ReactNode;
}

const TITLE_ID = 'dashboard-continue';

/** Destaque "Continuar jogando/mestrando": a campanha em andamento mais à mão. */
export function ContinueCard({
  campaign,
  eyebrow,
  action,
  children,
}: ContinueCardProps) {
  return (
    <Surface
      as="article"
      variant="secondary"
      className={styles.hero}
      aria-labelledby={TITLE_ID}
    >
      <SystemWatermark system={campaign.system} />
      <div className={styles.heroBody}>
        <div className={styles.heroTop}>
          <span className={styles.eyebrow}>
            <span className={styles.live} aria-hidden />
            {eyebrow}
          </span>
          <SystemTag system={campaign.system} chip />
        </div>
        <h2 id={TITLE_ID} className={styles.heroName}>
          {campaign.name}
        </h2>
        <div className={styles.heroMeta}>{children}</div>
      </div>
      <ButtonLink
        href={`/campaigns/${campaign.slug}`}
        variant="primary"
        size="lg"
        className={styles.heroAction}
      >
        {action}
        <ArrowRight size={18} aria-hidden />
      </ButtonLink>
    </Surface>
  );
}
