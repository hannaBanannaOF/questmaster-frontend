import { ScrollText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, DetailPage, ListState } from '@/src/design';

/** Link errado, excluída ou sem acesso: um estado só, sem revelar se ela existe. */
export async function CampaignNotFoundView() {
  const t = await getTranslations('campaign.detail');
  return (
    <DetailPage back={{ href: '/campaigns', label: t('back') }}>
      <ListState
        id="campaign-not-found"
        headingLevel={1}
        icon={<ScrollText />}
        title={t('notFound.title')}
        message={t('notFound.message')}
        actions={
          <ButtonLink href="/campaigns" variant="secondary">
            {t('notFound.back')}
          </ButtonLink>
        }
      />
    </DetailPage>
  );
}
