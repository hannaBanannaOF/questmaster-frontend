import { RpgKind } from "./rpg-kind";

export type CampaingListItem = {
  slug: string;
  name: string;
  system: RpgKind;
  dmed: boolean;
  inPlay: boolean;
}

export type CampaingDetailCharacter = {
  id: number;
  name: string;
  currentHp?: number;
  maxHp?: number;
}

export type CampaingDetailItem = {
  id: number;
  dmed: boolean;
  name: string;
  overview?: string;
  system: RpgKind;
  inPlay: boolean;
  inviteHash?: string; 
  characters: CampaingDetailCharacter[];
}