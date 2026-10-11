import { useTranslations } from 'next-intl';

import { Card, Stack } from '@/src/design';
// Caminhos específicos: o barrel do módulo carrega loaders server-only
import {
  type CampaignStatusCounts,
  orderStatusCounts,
} from '@/src/modules/campaign/domain';
import { campaignListHref } from '@/src/modules/campaign/presentation/campaign-list.params';
import { CampaignStatusBadge } from '@/src/modules/campaign/presentation/components/campaign-status-badge/campaign-status-badge';
import { CardLink } from '@/src/modules/shared/presentation';

import styles from '../../dashboard.module.css';

/** Contagem por status do mestre; cada uma leva à lista filtrada, menos as zeradas. */
export function StatusCountGrid({ counts }: { counts: CampaignStatusCounts }) {
  const t = useTranslations('dashboard');

  return (
    <section aria-label={t('dm.summary')} className={styles.statusGrid}>
      {orderStatusCounts(counts).map(({ status, count }) => {
        const content = (
          <Stack align="center" justify="space-between">
            <CampaignStatusBadge status={status} />
            <span className={styles.count}>{count}</span>
          </Stack>
        );
        // Zerada levaria a uma lista vazia: fica esmaecida e sem link
        return count === 0 ? (
          <Card key={status} compact className={styles.zero}>
            {content}
          </Card>
        ) : (
          <CardLink
            key={status}
            href={campaignListHref({ role: 'dm', status })}
          >
            {content}
          </CardLink>
        );
      })}
    </section>
  );
}
