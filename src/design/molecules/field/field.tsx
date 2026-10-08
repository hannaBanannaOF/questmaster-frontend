import type { ComponentProps, ReactNode } from 'react';

import { Input } from '../../atoms/input/input';
import { Label } from '../../atoms/label/label';
import { Select, type SelectOption } from '../../atoms/select/select';
import { Stack } from '../../atoms/stack/stack';
import { Text } from '../../atoms/text/text';
import { TextArea } from '../../atoms/textarea/textarea';

interface FieldBaseProps {
  label?: string;
  /** Mensagem de erro já traduzida. */
  error?: string;
}

interface FieldProps extends FieldBaseProps {
  id: string;
  required?: boolean;
  children: ReactNode;
}

/** Label + controle + mensagem de erro, com os vínculos de acessibilidade. */
export function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <Stack direction="column" align="stretch" gap="xxs">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <Text id={errorId(id)} tone="danger" small role="alert">
          {error}
        </Text>
      )}
    </Stack>
  );
}

const errorId = (id: string) => `${id}-error`;

function a11yProps(id: string, error?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId(id) : undefined,
  };
}

export function TextField({
  label,
  error,
  id,
  name,
  required,
  ...props
}: FieldBaseProps & ComponentProps<'input'>) {
  const fieldId = id ?? name ?? '';
  return (
    <Field id={fieldId} label={label} required={required} error={error}>
      <Input
        name={name}
        required={required}
        {...a11yProps(fieldId, error)}
        {...props}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  error,
  id,
  name,
  required,
  ...props
}: FieldBaseProps & ComponentProps<'textarea'>) {
  const fieldId = id ?? name ?? '';
  return (
    <Field id={fieldId} label={label} required={required} error={error}>
      <TextArea
        name={name}
        required={required}
        {...a11yProps(fieldId, error)}
        {...props}
      />
    </Field>
  );
}

export function SelectField({
  label,
  error,
  id,
  name,
  required,
  ...props
}: FieldBaseProps &
  ComponentProps<'select'> & {
    options: SelectOption[];
    placeholder?: string;
  }) {
  const fieldId = id ?? name ?? '';
  return (
    <Field id={fieldId} label={label} required={required} error={error}>
      <Select
        name={name}
        required={required}
        {...a11yProps(fieldId, error)}
        {...props}
      />
    </Field>
  );
}
