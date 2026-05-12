import { ComponentProps } from 'react';

import { Container } from '../../layout/container/Container';
import * as S from './styles';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}


export function Input(props: InputProps ) {

  const {label, ...inputProps} = props;
  const fieldId = props.id ?? props.name;

  return (
    <Container compact direction="column" align="stretch">
      { label && <S.InputLabel htmlFor={fieldId}>
        {label}
        {inputProps.required && <S.Required />}
      </S.InputLabel>}
      <S.InputBase id={fieldId} {...inputProps}></S.InputBase>
      {props.error && <S.Error $small>{props.error}</S.Error>}
    </Container>
  );
}