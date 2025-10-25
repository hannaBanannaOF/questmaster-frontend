import { TRpgKind } from "../shared/enums";

type SessionListItem = {
    slug: string;
    description: string;
    system: TRpgKind;
    dmed: boolean;
    inPlay: boolean;
}

type SessionDetailCharacter = {
    name: string;
    currentHp?: number;
    maxHp?: number;
}

type SessionDetailItem = {
    id: number;
    dmed: boolean;
    name: string;
    overview?: string;
    system: TRpgKind;
    inPlay: boolean;
    characters: SessionDetailCharacter[];
}

type CharacterSheetListItem = {
    slug: string;
    description: string;
    system: TRpgKind;
}

type CharacterSheetDetailItem = {
    id: number;
    name: string;
    system: TRpgKind;
    maxHp?: number;
    currentHp?: number;
}

type CalendarItem = {
    slug: string;
    name: string;
    system: TRpgKind;
    date: Date;
    dmed: boolean;
    scheduleId: number;
}