export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED',
}

/** Ciclo de vida: DRAFT → ACTIVE ⇄ PAUSED → ARCHIVED (final). */
const TRANSITIONS: Record<CampaignStatus, readonly CampaignStatus[]> = {
  [CampaignStatus.DRAFT]: [CampaignStatus.ACTIVE],
  [CampaignStatus.ACTIVE]: [CampaignStatus.PAUSED, CampaignStatus.ARCHIVED],
  [CampaignStatus.PAUSED]: [CampaignStatus.ACTIVE, CampaignStatus.ARCHIVED],
  [CampaignStatus.ARCHIVED]: [],
};

export function isCampaignStatus(value: unknown): value is CampaignStatus {
  return Object.values<unknown>(CampaignStatus).includes(value);
}

export function getAvailableTransitions(
  status: CampaignStatus,
): readonly CampaignStatus[] {
  return TRANSITIONS[status] ?? [];
}

export function canTransition(from: CampaignStatus, to: CampaignStatus) {
  return getAvailableTransitions(from).includes(to);
}
