'use client';

import { Archive, Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

import { Button, useToast } from '@/src/design';
import type { ActionResult } from '@/src/lib/actions';
import { useErrorMessage } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { CampaignStatus } from '../../../domain';
import { getTransitionLabelKey } from '../../campaign-status.meta';

const TRANSITION_ICON: Record<CampaignStatus, typeof Play> = {
  [CampaignStatus.DRAFT]: Play,
  [CampaignStatus.ACTIVE]: Play,
  [CampaignStatus.PAUSED]: Pause,
  [CampaignStatus.ARCHIVED]: Archive,
};

interface CampaignStatusActionsProps {
  status: CampaignStatus;
  transitions: readonly CampaignStatus[];
  /** Server Action já vinculada ao id da campanha. */
  updateStatus: (status: CampaignStatus) => Promise<ActionResult>;
}

/** Botões de mudança de status; a página é revalidada pela própria action. */
export function CampaignStatusActions({
  status,
  transitions,
  updateStatus,
}: CampaignStatusActionsProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const errorMessage = useErrorMessage();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<CampaignStatus | null>(null);

  const handleClick = (next: CampaignStatus) => {
    setTarget(next);
    startTransition(async () => {
      const result = await updateStatus(next);
      if (!result.ok) {
        toast({
          type: 'error',
          title: t('campaign.toast.error.update'),
          message: errorMessage(result.message),
        });
      }
    });
  };

  return transitions.map((next) => {
    const Icon = TRANSITION_ICON[next];
    return (
      <Button
        key={next}
        variant="muted"
        icon={<Icon size={12} />}
        loading={isPending && target === next}
        disabled={isPending}
        onClick={() => handleClick(next)}
      >
        {t(`campaign.${getTransitionLabelKey(status, next)}`)}
      </Button>
    );
  });
}
