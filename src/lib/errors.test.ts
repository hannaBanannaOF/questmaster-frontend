import { describe, expect, it } from 'vitest';

import { HttpError, isNotFoundOrForbidden, NotFoundError } from './errors';

describe('isNotFoundOrForbidden', () => {
  it('aceita "não encontrado" e 403', () => {
    expect(isNotFoundOrForbidden(new NotFoundError('x'))).toBe(true);
    expect(isNotFoundOrForbidden(new HttpError(403, 'forbidden'))).toBe(true);
  });

  it('recusa outros erros', () => {
    expect(isNotFoundOrForbidden(new HttpError(500, 'boom'))).toBe(false);
    expect(isNotFoundOrForbidden(new HttpError(401, 'auth'))).toBe(false);
    expect(isNotFoundOrForbidden(new Error('x'))).toBe(false);
  });
});
