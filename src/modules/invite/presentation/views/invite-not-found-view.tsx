import { Link2Off } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, DetailPage, ListState } from '@/src/design';

import styles from './invite.module.css';

/** Hash inexistente, malformado ou expirado: tela própria, com o caminho de volta. */
export async function InviteNotFoundView() {
  const t = await getTranslations('invite.notFound');
  return (
    <div className={styles.page}>
      <DetailPage>
        <ListState
          id="invite-not-found"
          headingLevel={1}
          icon={<Link2Off />}
          title={t('title')}
          message={t('message')}
          actions={
            <ButtonLink href="/" variant="secondary">
              {t('back')}
            </ButtonLink>
          }
        />
      </DetailPage>
    </div>
  );
}
