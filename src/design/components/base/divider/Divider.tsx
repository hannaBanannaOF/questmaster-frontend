import * as S from './styles';

interface DividerProps {
  vertical?: boolean;
}

export function Divider(props: DividerProps) {
  return <S.StylesLine $vertical={props.vertical} />;
}
