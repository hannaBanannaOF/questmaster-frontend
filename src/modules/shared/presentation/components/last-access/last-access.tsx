import { useLocale, useTranslations } from 'next-intl';

import { Text } from '@/src/design';

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

/**
 * Quando foi o último acesso, por dia do calendário: "hoje", "ontem",
 * "há 4 dias", depois semanas, meses e anos. O relativeTime do next-intl
 * não tem numeric: 'auto', que é o que dá "ontem" em vez de "há 1 dia".
 */
export function formatLastAccess(date: Date, now: Date, locale: string) {
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  // Relógio adiantado no core não vira "amanhã"
  const days = Math.max(
    0,
    Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS),
  );

  if (days < 7) return format.format(-days, 'day');
  if (days < 30) return format.format(-Math.floor(days / 7), 'week');
  if (days < 365) return format.format(-Math.floor(days / 30), 'month');
  return format.format(-Math.floor(days / 365), 'year');
}

/** "Aberta ontem" nos cards; nada quando o usuário nunca abriu o item. */
export function LastAccess({ date }: { date?: Date }) {
  const t = useTranslations('common');
  const locale = useLocale();

  if (!date) return null;
  return (
    <Text tone="muted" small>
      {t('lastAccess', { when: formatLastAccess(date, new Date(), locale) })}
    </Text>
  );
}
