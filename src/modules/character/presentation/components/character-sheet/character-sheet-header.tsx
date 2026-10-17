import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Avatar,
  Chip,
  DetailActions,
  DetailHero,
  DetailTitle,
} from '@/src/design';
import { SystemTag, SystemWatermark } from '@/src/modules/rpg';
import {
  ConfirmDeleteButton,
  DialogButton,
} from '@/src/modules/shared/presentation';

import { canEditCharacter, type CharacterDetails } from '../../../domain';
import {
  deleteCharacterAction,
  editCharacterAction,
} from '../../character.actions';
import { CharacterEditForm } from '../character-edit-form/character-edit-form';
import styles from './character-sheet.module.css';

const TITLE_ID = 'character-title';

/** Destaque da ficha: iniciais, sistema, nome, de quem é e as ações de quem edita. */
export function CharacterSheetHeader({
  character,
}: {
  character: CharacterDetails;
}) {
  const t = useTranslations();
  const { campaign } = character;

  const owner = character.isPlayer ? (
    <Chip tone="accent">{t('character.detail.mine')}</Chip>
  ) : character.isPremade ? (
    <Chip>{t('character.detail.premade')}</Chip>
  ) : (
    character.playerName && (
      <span className={styles.muted}>
        {t('character.detail.ownedBy', { name: character.playerName })}
      </span>
    )
  );

  return (
    <DetailHero
      labelledBy={TITLE_ID}
      watermark={<SystemWatermark system={character.system} />}
      main={
        <div className={styles.identity}>
          <Avatar name={character.name} size="xl" />
          <div className={styles.identityText}>
            <SystemTag system={character.system} />
            <DetailTitle id={TITLE_ID}>{character.name}</DetailTitle>
            {owner}
          </div>
        </div>
      }
      actions={
        canEditCharacter(character) && (
          <DetailActions label={t('character.detail.actions')}>
            <DialogButton
              label={t('character.actions.edit')}
              variant="secondary"
              icon={<Pencil size={18} />}
              title={t('character.edit.title')}
              closeLabel={t('common.actions.close')}
            >
              <CharacterEditForm
                action={editCharacterAction.bind(null, character.id)}
                name={character.name}
                system={character.system}
              />
            </DialogButton>
            <ConfirmDeleteButton
              // id vinculado aqui; a permissão é checada no use case/API
              action={deleteCharacterAction.bind(null, character.id)}
              errorTitleKey="character.toast.error.delete"
              icon={<Trash2 size={18} />}
              labels={{
                trigger: t('character.actions.delete'),
                title: t('character.delete.title', { name: character.name }),
                confirm: t('character.delete.submit'),
                cancel: t('character.delete.cancel'),
                close: t('common.actions.close'),
              }}
              description={
                campaign
                  ? t('character.delete.confirmInCampaign', {
                      campaign: campaign.name,
                    })
                  : t('character.delete.confirm')
              }
            />
          </DetailActions>
        )
      }
    />
  );
}
