/**
 * O gateway só aceita caminho relativo como destino pós-login (evita open redirect),
 * então URLs completas (ex.: referer) viram só path + query.
 */
export function toRelativePath(value?: string | null): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value, 'http://relative.invalid');
    const path = url.pathname + url.search;
    return path.startsWith('//') ? undefined : path;
  } catch {
    return undefined;
  }
}
