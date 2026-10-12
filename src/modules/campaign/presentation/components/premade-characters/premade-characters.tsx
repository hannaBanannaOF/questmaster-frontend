import { Plus, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Stack, Title } from '@/src/design';
// Caminho direto: o barrel de character carrega loaders server-only
import { CharacterCard } from '@/src/modules/character/presentation/components/character-card/character-card';
import {
  ConfirmDeleteButton,
  DialogButton,
} from '@/src/modules/shared/presentation';

import type { CampaignDetails } from '../../../domain';
import {
  createPremadeCharacterAction,
  deletePremadeCharacterAction,
} from '../../campaign.actions';
import styles from '../campaign-characters/campaign-characters.module.css';
import { PremadeCharacterForm } from '../premade-character-form/premade-character-form';

const HEADING_ID = 'premade-characters';

/** Fichas prontas do mestre, ainda sem jogador; só o mestre vê. */
export function PremadeCharacters({
  campaign,
  canCreate,
}: {
  campaign: Pick<
    CampaignDetails,
    'id' | 'slug' | 'system' | 'premadeCharacters'
  >;
  /** A campanha ainda aceita convites, então aceita fichas novas. */
  canCreate: boolean;
}) {
  const t = useTranslations();
  const characters = campaign.premadeCharacters;

  return (
    <Stack as="section" direction="column" align="stretch">
      <Stack align="center" justify="space-between" wrap>
        <Stack align="center">
          <UserPlus size={24} color="var(--color-primary)" aria-hidden />
          <Title order={3} id={HEADING_ID}>
            {t('campaign.premade.title')} ({characters.length})
          </Title>
        </Stack>
        {canCreate && (
          <DialogButton
            label={t('campaign.premade.new')}
            icon={<Plus size={20} />}
            title={t('campaign.premade.create.title')}
            description={t('campaign.premade.create.subtitle')}
            closeLabel={t('common.actions.close')}
          >
            <PremadeCharacterForm
              action={createPremadeCharacterAction.bind(null, campaign.id)}
            />
          </DialogButton>
        )}
      </Stack>
      {characters.length > 0 && (
        <ul className={styles.grid} aria-labelledby={HEADING_ID}>
          {characters.map(({ id, slug, name, currentHp, maxHp }) => (
            <li key={id}>
              <Stack direction="column" align="stretch" gap="xs">
                {slug && (
                  <CharacterCard
                    character={{
                      slug,
                      name,
                      system: campaign.system,
                      currentHp,
                      maxHp,
                    }}
                  />
                )}
                {/* Fora do card, que já é um link inteiro */}
                <Stack justify="end">
                  <ConfirmDeleteButton
                    action={deletePremadeCharacterAction.bind(
                      null,
                      campaign.slug,
                      id,
                    )}
                    errorTitleKey="campaign.premade.toast.error.delete"
                    labels={{
                      trigger: t('campaign.premade.delete.trigger'),
                      title: t('campaign.premade.delete.title'),
                      confirm: t('campaign.premade.delete.submit'),
                      cancel: t('campaign.premade.delete.cancel'),
                      close: t('common.actions.close'),
                    }}
                    description={t.rich('campaign.premade.delete.confirm', {
                      name,
                      bold: (chunks) => <strong>{chunks}</strong>,
                    })}
                  />
                </Stack>
              </Stack>
            </li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
