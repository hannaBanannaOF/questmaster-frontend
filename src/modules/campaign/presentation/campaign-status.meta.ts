import { CampaignStatus } from '../domain/campaign-status.types';

export const CAMPAIGN_STATUS_META = {
  [CampaignStatus.DRAFT]: {
    translationLabel: 'status.draft',
  },
  [CampaignStatus.ARCHIVED]: {
    translationLabel: 'status.archived',
  },
  [CampaignStatus.PAUSED]: {
    translationLabel: 'status.paused',
  },
  [CampaignStatus.ACTIVE]: {
    translationLabel: 'status.active',
  },
} as const;

export function getCampaignStatusMeta(status: CampaignStatus) {
  return CAMPAIGN_STATUS_META[status];
}
