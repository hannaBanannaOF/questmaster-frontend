import { DomainError } from '@/src/lib/errors';

// Mensagens são chaves de tradução, resolvidas na apresentação

export class InvalidStatusTransitionError extends DomainError {
  constructor() {
    super('campaign.errors.invalidTransition');
  }
}

export class CampaignNotDeletableError extends DomainError {
  constructor() {
    super('campaign.errors.notDeletable');
  }
}
