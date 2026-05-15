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

  const request = async <Response, RequestBody>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Response> => {
    const response = await fetch(input, {
      credentials: 'include',
      ...init,
    });

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
    get: <Response, QueryParams = undefined>(
      uri: string,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, undefined>(buildUrl<QueryParams>(uri, params, v), {
        headers: buildHeaders({
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
      }),

    post: <Response, RequestBody, QueryParams = undefined>(
      uri: string,
      data?: RequestBody,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, RequestBody>(buildUrl<QueryParams>(uri, params, v), {
        method: 'POST',
        headers: buildHeaders({
          useData: data !== undefined,
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    patch: <Response, RequestBody, QueryParams = undefined>(
      uri: string,
      data?: RequestBody,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, RequestBody>(buildUrl<QueryParams>(uri, params, v), {
        method: 'PATCH',
        headers: buildHeaders({
          useData: data !== undefined,
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: <Response, QueryParams = undefined>(
      uri: string,
      params?: QueryParams,
      v = 1,
    ) =>
      request<Response, undefined>(buildUrl<QueryParams>(uri, params, v), {
        method: 'DELETE',
        headers: buildHeaders({
          sessionToken: sessionToken,
          originalUrl: originalUrl,
        }),
      }),
  };
}
