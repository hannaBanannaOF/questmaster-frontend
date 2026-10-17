'use client';

import { Archive, Pause, Play, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

import { Button, DetailActions, useToast } from '@/src/design';
import {
  ConfirmDeleteButton,
  ConfirmDialog,
} from '@/src/modules/shared/presentation';
import { useErrorMessage } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import {
  type CampaignDetails,
  CampaignStatus,
  canDeleteCampaign,
  getAvailableTransitions,
} from '../../../domain';
import {
  archiveCampaignAction,
  deleteCampaignAction,
  updateCampaignStatusAction,
} from '../../campaign.actions';
import { getTransitionLabelKey } from '../../campaign-status.meta';

/**
 * Ações de status do mestre. Iniciar, pausar e retomar agem na hora;
 * Encerrar e Excluir (vermelho suave) pedem confirmação.
 */
export function CampaignHeaderActions({
  campaign,
}: {
  campaign: Pick<CampaignDetails, 'id' | 'name' | 'status' | 'isDm'>;
}) {
  const t = useTranslations();
  const { toast } = useToast();
  const errorMessage = useErrorMessage();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<CampaignStatus | null>(null);
  const [confirmEnd, setConfirmEnd] = useState(false);

  const transitions = getAvailableTransitions(campaign.status);
  const direct = transitions.filter((next) => next !== CampaignStatus.ARCHIVED);
  const canEnd = transitions.includes(CampaignStatus.ARCHIVED);
  const name = { name: campaign.name };

  const change = (next: CampaignStatus) => {
    setTarget(next);
    startTransition(async () => {
      const result = await updateCampaignStatusAction(campaign.id, next);
      if (!result.ok) {
        toast({
          type: 'error',
          title: t('campaign.toast.error.update'),
          message: errorMessage(result.message),
        });
      }
    });
  };

  return (
    <DetailActions label={t('campaign.detail.statusActions')}>
      {direct.map((next) => (
        <Button
          key={next}
          // Começar e voltar a jogar são o passo principal; pausar não
          variant={next === CampaignStatus.ACTIVE ? 'primary' : 'secondary'}
          icon={
            next === CampaignStatus.PAUSED ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )
          }
          loading={isPending && target === next}
          disabled={isPending}
          onClick={() => change(next)}
        >
          {t(`campaign.${getTransitionLabelKey(campaign.status, next)}`)}
        </Button>
      ))}
      {canEnd && (
        <>
          <Button
            variant="danger-soft"
            icon={<Archive size={18} />}
            aria-haspopup="dialog"
            disabled={isPending}
            onClick={() => setConfirmEnd(true)}
          >
            {t('campaign.actions.end')}
          </Button>
          <ConfirmDialog
            open={confirmEnd}
            onClose={() => setConfirmEnd(false)}
            action={archiveCampaignAction.bind(null, campaign.id)}
            title={t('campaign.end.title', name)}
            description={t('campaign.end.message')}
            confirmLabel={t('campaign.end.submit')}
            cancelLabel={t('campaign.end.cancel')}
            closeLabel={t('common.actions.close')}
            errorTitleKey="campaign.toast.error.update"
            icon={<Archive />}
          />
        </>
      )}
      {canDeleteCampaign(campaign) && (
        <ConfirmDeleteButton
          action={deleteCampaignAction.bind(null, campaign.id)}
          errorTitleKey="campaign.toast.error.delete"
          icon={<Trash2 size={18} />}
          labels={{
            trigger: t('campaign.actions.delete'),
            title: t('campaign.delete.title', name),
            confirm: t('campaign.delete.submit'),
            cancel: t('campaign.delete.cancel'),
            close: t('common.actions.close'),
          }}
          description={t('campaign.delete.confirm')}
        />
      )}
    </DetailActions>
  );
}
