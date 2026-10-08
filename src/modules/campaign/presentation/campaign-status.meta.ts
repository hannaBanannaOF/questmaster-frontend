import type { BadgeTone } from '@/src/design';

import { CampaignStatus } from '../domain';

// Chaves relativas ao namespace "campaign" das traduções

const STATUS_META: Record<
  CampaignStatus,
  { labelKey: string; tone: BadgeTone }
> = {
  [CampaignStatus.DRAFT]: { labelKey: 'status.draft', tone: 'info' },
  [CampaignStatus.ACTIVE]: { labelKey: 'status.active', tone: 'success' },
  [CampaignStatus.PAUSED]: { labelKey: 'status.paused', tone: 'warning' },
  [CampaignStatus.ARCHIVED]: { labelKey: 'status.archived', tone: 'neutral' },
};

export function getCampaignStatusMeta(status: CampaignStatus) {
  return STATUS_META[status] ?? STATUS_META[CampaignStatus.DRAFT];
}

/** O mesmo destino tem nomes diferentes conforme a origem (iniciar × retomar). */
export function getTransitionLabelKey(
  from: CampaignStatus,
  to: CampaignStatus,
): string {
  switch (to) {
    case CampaignStatus.ACTIVE:
      return from === CampaignStatus.DRAFT ? 'actions.start' : 'actions.resume';
    case CampaignStatus.PAUSED:
      return 'actions.pause';
    default:
      return from === CampaignStatus.ACTIVE ? 'actions.end' : 'actions.archive';
  }
}
