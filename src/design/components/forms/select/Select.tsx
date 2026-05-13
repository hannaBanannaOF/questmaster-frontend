import { ChevronDown } from 'lucide-react';
import { ComponentProps } from 'react';

import { Container } from '../../layout/container/Container';
import * as InputStyles from '../input/styles';
import * as SelectStyles from './styles';

interface SelectProps extends ComponentProps<'select'> {
  label?: string;
  options?: { value: string; label: string }[];
  showDefault?: boolean;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  showDefault,
  error,
  ...selectProps
}) => {
  const fieldId = selectProps.id ?? selectProps.name;

  return (
    <Container compact direction="column" align="stretch">
      {label && (
        <InputStyles.InputLabel htmlFor={fieldId}>
          {label}
          {selectProps.required && <InputStyles.Required />}
        </InputStyles.InputLabel>
      )}

      <SelectStyles.SelectWrapper>
        <SelectStyles.StyledSelect
          as="select"
          id={fieldId}
          {...selectProps}
          defaultValue={''}
        >
          {showDefault && (
            <option disabled value={''}>
              {/* TODO translate */}
              Selecione uma opção...
            </option>
          )}
          {options &&
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
        </SelectStyles.StyledSelect>

        <SelectStyles.IconContainer>
          <ChevronDown size={18} strokeWidth={2.5} />
        </SelectStyles.IconContainer>
      </SelectStyles.SelectWrapper>

      {error && <InputStyles.Error $small>{error}</InputStyles.Error>}
    </Container>
  );
};
