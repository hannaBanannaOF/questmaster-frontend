import { getEnv } from '../env';
import { HttpError } from './http.types';
import { Microservices } from './services.types';

async function parseResponse(response: Response) {
  if (response.status === 204) return null;

  const json = await response.json().catch(() => null);
  return json;
}

function buildHeaders({
  useData,
  sessionToken,
  originalUrl,
}: {
  useData?: boolean;
  sessionToken?: string;
  originalUrl?: string;
}) {
  const headers: Record<string, string> = {};

  if (sessionToken) {
    headers['Cookie'] =
      `${getEnv('SESSION_COOKIE_NAME') ?? ''}=${sessionToken}`;
  }

  if (useData) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
  }

  // Optional: forward original URL (client only)
  if (typeof window !== 'undefined') {
    headers['Original-Url'] = window.location.pathname + window.location.search;
  } else if (originalUrl) {
    headers['Original-Url'] = originalUrl;
  }

  return headers;
}

async function handleAuth(response: Response) {
  if (response.status !== 401) return;

  const { redirectUrl } = await response.json();
  if (typeof window !== 'undefined') {
    window.location.replace(redirectUrl);
  }

  throw {
    status: 401,
    message: 'Unauthorized',
    data: redirectUrl,
  } satisfies HttpError<string | undefined>;
}

export function createHttpClient(
  ms: Microservices,
  sessionToken?: string,
  originalUrl?: string,
) {
  const baseUrl = getEnv('CORE_API_URL');

  const request = async <T, J>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<T> => {
    const response = await fetch(input, {
      credentials: 'include',
      ...init,
    });

    await handleAuth(response);

    if (!response.ok) {
      const data = await parseResponse(response);

      throw {
        status: response.status,
        message: data?.message ?? 'Request failed',
        data,
      } satisfies HttpError<J>;
    }

    return await parseResponse(response);
  };

  const buildUrl = (uri: string, apiVersion = 1) =>
    `${baseUrl}/${ms}/api/v${apiVersion}/${uri}`;

  return {
    get: <T>(uri: string, v = 1) =>
      request<T, undefined>(buildUrl(uri, v), {
        headers: buildHeaders({
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
      }),

    post: <T, J>(uri: string, data?: J, v = 1) =>
      request<T, J>(buildUrl(uri, v), {
        method: 'POST',
        headers: buildHeaders({
          useData: data !== undefined,
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    patch: <T, J>(uri: string, data?: J, v = 1) =>
      request<T, J>(buildUrl(uri, v), {
        method: 'PATCH',
        headers: buildHeaders({
          useData: data !== undefined,
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: <T>(uri: string, v = 1) =>
      request<T, undefined>(buildUrl(uri, v), {
        method: 'DELETE',
        headers: buildHeaders({
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
      }),
  };
}
