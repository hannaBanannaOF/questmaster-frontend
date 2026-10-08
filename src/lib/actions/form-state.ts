/**
 * Retorno padrão das Server Actions usadas com useActionState.
 * Erros de campo e mensagens de sucesso são chaves de tradução;
 * `message` de erro vem da API/domínio e já é legível.
 */
export interface FormState<Field extends string = string> {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  /** Valores enviados, para repopular o form (o React reseta após a action). */
  values?: Partial<Record<Field, string>>;
}

export const initialFormState: FormState = { status: 'idle' };

/** Resultado de actions chamadas fora de <form> (ex.: botões, stepper). */
export type ActionResult<T = void> =
  { ok: true; data: T } | { ok: false; message?: string };
