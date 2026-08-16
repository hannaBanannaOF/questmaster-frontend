import 'server-only';

import { cookies, headers as getNextHeaders } from 'next/headers';
import { redirect } from 'next/navigation';

import { HttpError } from './http.types';
import { Microservices } from './services.types';

async function parseResponse(response: Response) {
  if (response.status === 204) return null;

  const json = await response.json().catch(() => null);
  return json;
}

async function buildHeaders({
  useData,
  originalUrl,
}: {
  useData?: boolean;
  originalUrl?: string;
}) {
  const headers: Record<string, string> = {};

  // Captura o cookie de sessão automaticamente
  const cookieStore = await cookies();
  const cookieName = process.env.SESSION_COOKIE_NAME;

  if (cookieName) {
    const sessionToken = cookieStore.get(cookieName)?.value;
    if (sessionToken) {
      headers['Cookie'] = `${cookieName}=${sessionToken}`;
    }
  }

  if (useData) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
  }

  if (originalUrl) {
    headers['Original-Url'] = originalUrl;
  } else {
    const incomingHeaders = await getNextHeaders();
    const currentPath =
      incomingHeaders.get('x-pathname') || incomingHeaders.get('referer');
    if (currentPath) {
      headers['Original-Url'] = currentPath;
    }
  }

  return headers;
}

async function handleAuth(response: Response) {
  if (response.status !== 401) return;

  const { redirectUrl } = await response
    .json()
    .catch(() => ({ redirectUrl: '/login' }));

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  throw {
    status: 401,
    message: 'Unauthorized',
    data: redirectUrl,
  } satisfies HttpError<string | undefined>;
}

export function createHttpClient(ms: Microservices, originalUrl?: string) {
  const baseUrl = process.env.CORE_API_URL;

  const request = async <Response, RequestBody>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Response> => {
    const response = await fetch(input, init);

    await handleAuth(response);

    if (!response.ok) {
      const data = await parseResponse(response);

      throw {
        status: response.status,
        message:
          response.status === 500
            ? 'Internal Server Error'
            : (data?.message ?? 'Request failed'),
        data,
      } satisfies HttpError<RequestBody>;
    }

    return await parseResponse(response);
  };

  const buildUrl = <QueryParams>(
    uri: string,
    params?: QueryParams,
    apiVersion = 1,
  ) => {
    let url = `${baseUrl}/${ms}/api/v${apiVersion}/${uri}`;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    return url;
  };

  return {
    get: async <Response, QueryParams = undefined>(
      uri: string,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, undefined>(buildUrl<QueryParams>(uri, params, v), {
        headers: await buildHeaders({
          originalUrl,
        }),
      }),

    post: async <Response, RequestBody, QueryParams = undefined>(
      uri: string,
      data?: RequestBody,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, RequestBody>(buildUrl<QueryParams>(uri, params, v), {
        method: 'POST',
        headers: await buildHeaders({
          useData: data !== undefined,
          originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    patch: async <Response, RequestBody, QueryParams = undefined>(
      uri: string,
      data?: RequestBody,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, RequestBody>(buildUrl<QueryParams>(uri, params, v), {
        method: 'PATCH',
        headers: await buildHeaders({
          useData: data !== undefined,
          originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: async <Response, QueryParams = undefined>(
      uri: string,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, undefined>(buildUrl<QueryParams>(uri, params, v), {
        method: 'DELETE',
        headers: await buildHeaders({
          originalUrl,
        }),
      }),
  };
}
