import { getTranslations } from 'next-intl/server';

import { Loader } from '@/src/design';

// O dashboard é feito de listas: tamanho imprevisível, então Loader em vez de skeleton
export default async function HomeLoading() {
  const t = await getTranslations('dashboard');
  return <Loader size="lg" message={t('loading')} />;
}
