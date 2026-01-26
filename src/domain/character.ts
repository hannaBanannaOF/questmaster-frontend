import { RpgKind } from "./rpg-kind";

export type CharacterSheetListItem = {
  slug: string;
  name: string;
  system: RpgKind;
}

export type CharacterSheetDetailItem = {
  id: number;
  name: string;
  system: RpgKind;
  maxHp?: number;
  currentHp?: number;
}