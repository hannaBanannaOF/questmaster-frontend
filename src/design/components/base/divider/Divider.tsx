import * as S from './styles';

interface DividerProps {
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ vertical }) => {
  return <S.StylesLine $vertical={vertical} />;
};
