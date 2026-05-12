import { ChevronDown } from 'lucide-react';
import { ComponentProps } from 'react';

import { Container } from '../../layout/container/Container';
import * as InputStyles from '../input/styles';
import * as SelectStyles from './styles';

interface SelectProps extends ComponentProps<'select'> {
  label?: string;
  options?: { value: string; label: string }[];
  showDefault?: boolean
  error?: string;
}

export function Select(props: SelectProps) {
  const { label, options, showDefault, ...rest } = props;
  const fieldId = props.id ?? props.name;

  return (
    <Container compact direction="column" align="stretch">
      {label && (
        <InputStyles.InputLabel htmlFor={fieldId}>
          {label}
          {props.required && <InputStyles.Required />}
        </InputStyles.InputLabel>
      )}

      <SelectStyles.SelectWrapper>
        <SelectStyles.StyledSelect as='select' id={fieldId} {...rest} defaultValue={''}>
          {showDefault && <option disabled value={''}>Selecione uma opção...</option>}
          {options && options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectStyles.StyledSelect>
        
        <SelectStyles.IconContainer>
          <ChevronDown size={18} strokeWidth={2.5} />
        </SelectStyles.IconContainer>
      </SelectStyles.SelectWrapper>

      {props.error && <InputStyles.Error $small>{props.error}</InputStyles.Error>}
    </Container>
  );
}