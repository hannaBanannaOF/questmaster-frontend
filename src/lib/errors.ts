// Shared kernel: erros conhecidos por todas as camadas (domain, infra, presentation)

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

/** Regra de negócio violada; a mensagem pode ser exibida ao usuário. */
export class DomainError extends AppError {}

/** O recurso pedido não existe (ou o usuário não pode vê-lo). */
export class NotFoundError extends AppError {}

/** Falha de comunicação com a API que não tem significado de domínio. */
export class HttpError extends AppError {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Para quem não pode ver um recurso, ele não existe: 403 vira "não encontrado". */
export function isNotFoundOrForbidden(error: unknown) {
  return (
    error instanceof NotFoundError ||
    (error instanceof HttpError && error.status === 403)
  );
}
