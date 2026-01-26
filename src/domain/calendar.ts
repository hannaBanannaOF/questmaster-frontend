import { RpgKind } from './rpg-kind';

export type CalendarItem = {
  slug: string;
  name: string;
  system: RpgKind;
  date: Date;
  dmed: boolean;
  scheduleId: number;
}