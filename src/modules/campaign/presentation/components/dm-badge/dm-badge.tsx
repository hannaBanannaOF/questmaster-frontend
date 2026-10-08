import { Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IconText } from '@/src/design';

export function DmBadge() {
  const t = useTranslations('campaign');
  return (
    <IconText tone="primary" icon={<Crown size={20} />}>
      {t('dm')}
    </IconText>
  );
}
