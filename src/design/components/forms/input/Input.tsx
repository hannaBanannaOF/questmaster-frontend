import { ComponentProps } from 'react';

import { Container } from '../../layout/container/Container';
import * as S from './styles';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  ...inputProps
}) => {
  const fieldId = inputProps.id ?? inputProps.name;

  return (
    <Container compact direction="column" align="stretch">
      {label && (
        <S.InputLabel htmlFor={fieldId}>
          {label}
          {inputProps.required && <S.Required />}
        </S.InputLabel>
      )}
      <S.InputBase id={fieldId} {...inputProps}></S.InputBase>
      {error && <S.Error $small>{error}</S.Error>}
    </Container>
  );
};
