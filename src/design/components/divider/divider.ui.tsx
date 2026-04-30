import * as S from './divider.styles';

export default function Divider({ vertical }: { vertical?: boolean }) {
  return <S.StylesLine $vertical={vertical} />;
}
