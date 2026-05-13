import { ComponentProps } from 'react';

import { Container } from '../../layout/container/Container';
import * as InputStyles from '../input/styles';
import * as S from './styles';

interface TextAreaProps extends ComponentProps<'textarea'> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  ...inputProps
}) => {
  const fieldId = inputProps.id ?? inputProps.name;

  return (
    <Container compact direction="column" align="stretch">
      {label && (
        <InputStyles.InputLabel htmlFor={fieldId}>
          {label}
          {inputProps.required && <InputStyles.Required />}
        </InputStyles.InputLabel>
      )}
      <S.StyledTextArea
        as={'textarea'}
        id={fieldId}
        {...inputProps}
      ></S.StyledTextArea>
      {error && <InputStyles.Error $small>{error}</InputStyles.Error>}
    </Container>
  );
};
