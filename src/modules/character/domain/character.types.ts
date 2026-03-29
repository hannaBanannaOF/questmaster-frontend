import { RpgKind } from '../../rpg/domain/rpg-kind.types';

export type Character = {
  slug: string;
  name: string;
  system: RpgKind;
};
