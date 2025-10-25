import { GiBookAura, GiFlexibleStar, GiFloatingGhost } from "react-icons/gi";

export enum Microservices {
  core = "core"
}

export enum TRpgKind {
  callOfCthulhu = 'CALL_OF_CTHULHU',
  ghostbusters = 'GHOSTBUSTERS'
}

export namespace TRpgKind {
  export function getLabel(kind?: TRpgKind) {
    switch (kind) {
      case TRpgKind.callOfCthulhu:
        return 'Call of Cthulhu'
      case TRpgKind.ghostbusters:
        return 'Ghostbusters'
      default:
        return '';
    }
  }

  export function getIcon(kind: TRpgKind, size?: number) {
    switch (kind) {
      case TRpgKind.callOfCthulhu:
        return <GiFlexibleStar size={size ?? 24}/>
      case TRpgKind.ghostbusters:
        return <GiFloatingGhost size={size ?? 24}/>
      default:
        return <GiBookAura size={size ?? 24}/>
    }
  }

  export function getSelectValues() {
    return [
      {value: TRpgKind.callOfCthulhu, label: TRpgKind.getLabel(TRpgKind.callOfCthulhu)}
    ]
  }
}