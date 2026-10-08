import 'server-only';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { HttpError, NotFoundError } from '../errors';
import { toRelativePath } from './relative-path';

/** Serviços expostos pelo gateway (prefixo da rota: /<serviço>/api/v<n>/...). */
export enum Microservice {
  Core = 'core',
}

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface HttpClient {
  get<T>(path: string, query?: QueryParams): Promise<T>;
  post<T = void>(path: string, body?: unknown): Promise<T>;
  patch<T = void>(path: string, body?: unknown): Promise<T>;
  delete<T = void>(path: string): Promise<T>;
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

/**
 * Client HTTP para o gateway. Só roda no servidor: repassa o cookie de sessão
 * (o gateway troca pelo Bearer) e nunca expõe tokens ao browser.
 */
export function createHttpClient(
  service: Microservice,
  apiVersion = 1,
): HttpClient {
  const request = async <T>(
    method: Method,
    path: string,
    { query, body }: { query?: QueryParams; body?: unknown } = {},
  ): Promise<T> => {
    const response = await fetch(buildUrl(service, apiVersion, path, query), {
      method,
      headers: await buildHeaders(body !== undefined),
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
    });

    if (response.status === 401) await redirectToLogin(response);
    if (response.status === 404) {
      throw new NotFoundError(await errorMessage(response, 'Not found'));
    }
    if (!response.ok) {
      throw new HttpError(
        response.status,
        await errorMessage(response, 'Request failed'),
      );
    }

    return parseBody<T>(response);
  };

  return {
    get: (path, query) => request('GET', path, { query }),
    post: (path, body) => request('POST', path, { body }),
    patch: (path, body) => request('PATCH', path, { body }),
    delete: (path) => request('DELETE', path),
  };
}

function buildUrl(
  service: Microservice,
  apiVersion: number,
  path: string,
  query?: QueryParams,
) {
  const baseUrl = process.env.CORE_API_URL;
  if (!baseUrl) {
    throw new Error('CORE_API_URL não configurada (URL do gateway)');
  }

  const url = new URL(`${baseUrl}/${service}/api/v${apiVersion}/${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }
  return url;
}

async function buildHeaders(hasBody: boolean) {
  const result: Record<string, string> = {};

  const cookieName = process.env.SESSION_COOKIE_NAME;
  const session = cookieName && (await cookies()).get(cookieName)?.value;
  if (session) {
    result['Cookie'] = `${cookieName}=${session}`;
  }

  if (hasBody) {
    result['Content-Type'] = 'application/json;charset=UTF-8';
  }

  // Para onde o gateway manda o usuário de volta depois do login
  const originalUrl = toRelativePath((await headers()).get('referer'));
  if (originalUrl) {
    result['Original-Url'] = originalUrl;
  }

  return result;
}

async function redirectToLogin(response: Response): Promise<never> {
  const body = await response.json().catch(() => null);
  const redirectUrl: unknown = body?.redirectUrl;

  if (typeof redirectUrl === 'string' && redirectUrl) {
    redirect(redirectUrl);
  }
  throw new HttpError(401, 'Unauthorized');
}

async function errorMessage(response: Response, fallback: string) {
  if (response.status >= 500) return 'Internal Server Error';
  const body = await response.json().catch(() => null);
  return typeof body?.message === 'string' ? body.message : fallback;
}

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
