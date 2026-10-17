/** Caminho do convite (`/join/<uuid>`), o único lugar para onde a criação volta. */
const INVITE_PATH =
  /^\/join\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Para onde voltar depois de criar uma ficha. Vem do form (entrada pública):
 * só um caminho interno de convite passa; o resto é ignorado.
 */
export function safeReturnTo(value: unknown): string | undefined {
  return typeof value === 'string' && INVITE_PATH.test(value)
    ? value
    : undefined;
}
