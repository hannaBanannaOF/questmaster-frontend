import { CircleAlert } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { Input } from '../../atoms/input/input';
import { Label } from '../../atoms/label/label';
import { Select, type SelectOption } from '../../atoms/select/select';
import { TextArea } from '../../atoms/textarea/textarea';
import styles from './field.module.css';

interface FieldBaseProps {
  label?: string;
  /** Mensagem de erro já traduzida. */
  error?: string;
  /** Ajuda abaixo do campo (some quando há erro). */
  description?: string;
}

interface FieldProps extends FieldBaseProps {
  id: string;
  required?: boolean;
  children: ReactNode;
}

/** Label + controle + ajuda ou erro, com os vínculos de acessibilidade. */
export function Field({
  id,
  label,
  required,
  error,
  description,
  children,
}: FieldProps) {
  return (
    <div className={styles.field}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p id={errorId(id)} className={styles.error} role="alert">
          <CircleAlert aria-hidden />
          {error}
        </p>
      ) : (
        description && (
          <p id={descriptionId(id)} className={styles.description}>
            {description}
          </p>
        )
      )}
    </div>
  );
}

const errorId = (id: string) => `${id}-error`;
const descriptionId = (id: string) => `${id}-description`;

function a11yProps(id: string, error?: string, description?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error
      ? errorId(id)
      : description
        ? descriptionId(id)
        : undefined,
  };
}

export function TextField({
  label,
  error,
  description,
  id,
  name,
  required,
  ...props
}: FieldBaseProps & ComponentProps<'input'>) {
  const fieldId = id ?? name ?? '';
  return (
    <Field
      id={fieldId}
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <Input
        name={name}
        required={required}
        {...a11yProps(fieldId, error, description)}
        {...props}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  error,
  description,
  id,
  name,
  required,
  ...props
}: FieldBaseProps & ComponentProps<'textarea'>) {
  const fieldId = id ?? name ?? '';
  return (
    <Field
      id={fieldId}
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <TextArea
        name={name}
        required={required}
        {...a11yProps(fieldId, error, description)}
        {...props}
      />
    </Field>
  );
}

export function SelectField({
  label,
  error,
  description,
  id,
  name,
  required,
  ...props
}: FieldBaseProps &
  ComponentProps<'select'> & {
    options: SelectOption[];
    placeholder?: string;
    startContent?: ReactNode;
  }) {
  const fieldId = id ?? name ?? '';
  return (
    <Field
      id={fieldId}
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <Select
        name={name}
        required={required}
        {...a11yProps(fieldId, error, description)}
        {...props}
      />
    </Field>
  );
}
