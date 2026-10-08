import { type AnyObjectSchema, type InferType, ValidationError } from 'yup';

type ValidationResult<T> =
  { ok: true; data: T } | { ok: false; fieldErrors: Record<string, string> };

/** Valida o input de uma Server Action; erros vêm como chaves de tradução. */
export async function validate<Schema extends AnyObjectSchema>(
  schema: Schema,
  input: unknown,
): Promise<ValidationResult<InferType<Schema>>> {
  try {
    const data = await schema.validate(input, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { ok: true, data };
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;

    const fieldErrors: Record<string, string> = {};
    for (const issue of error.inner) {
      if (issue.path && !fieldErrors[issue.path]) {
        fieldErrors[issue.path] = issue.message;
      }
    }
    return { ok: false, fieldErrors };
  }
}

/** Lê os campos de texto de um FormData para devolver ao form em caso de erro. */
export function formValues<Field extends string>(
  formData: FormData,
  fields: readonly Field[],
): Partial<Record<Field, string>> {
  const values: Partial<Record<Field, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === 'string') values[field] = value;
  }
  return values;
}
