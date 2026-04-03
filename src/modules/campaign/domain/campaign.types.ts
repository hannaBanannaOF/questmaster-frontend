import { GameSystem } from '@/src/modules/rpg/domain/game-system.types';

import { CampaignStatus } from './campaign-status.types';

export type Campaign = {
  slug: string;
  name: string;
  system: GameSystem;
  dmed: boolean;
  status: CampaignStatus;
  playerCount: number;
};
