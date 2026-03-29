import { RpgKind } from '../domain/rpg-kind.types';
import { getRpgKindMeta } from './rpg-kind.meta';
import * as S from './rpg-kind.styles';

export function RpgKindIcon({ kind }: { kind: RpgKind }) {
  const Icon = getRpgKindMeta(kind).icon;
  return (
    <S.IconContainer $kind={kind}>
      <Icon size={24} display="flex" />
    </S.IconContainer>
  );
}
