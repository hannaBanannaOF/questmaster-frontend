'use client';

import { useFormStatus } from 'react-dom';

import { Button, type ButtonProps } from '../../atoms/button/button';

/** Botão de submit que mostra loading enquanto o <form> pai está enviando. */
export function SubmitButton({
  disabled,
  ...props
}: Omit<ButtonProps, 'type'>) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} disabled={disabled} {...props} />
  );
}
