import { GameSystem } from '../../rpg';

export type Invite = {
  inviteHash: string;
  campaignSlug: string;
  campaignName: string;
  campaignOverview?: string;
  campaignPlayerCount: number;
  campaignSystem: GameSystem;
};
