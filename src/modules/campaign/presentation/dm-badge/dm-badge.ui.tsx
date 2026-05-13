import { Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import { IconSpan } from '@/src/design';

export function DmBadge() {
  const theme = useTheme();
  const t = useTranslations('campaign');

  return (
    <IconSpan
      color={theme.colors.primary.default}
      icon={<Crown size={20} display="flex" />}
      data={t('dm')}
    />
  );
}
