import { RpgKind } from '@/src/modules/rpg/domain/rpg-kind.types';

import { CampaignStatus } from './campaign-status.types';

export type Campaign = {
  slug: string;
  name: string;
  system: RpgKind;
  dmed: boolean;
  status: CampaignStatus;
};
