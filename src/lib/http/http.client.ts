import { HttpError } from './http.types';
import { Microservices } from './services.types';

async function parseResponse(response: Response) {
  if (response.status === 204) return null;

  const json = await response.json().catch(() => null);
  return json;
}

function buildHeaders(useData?: boolean) {
  let originMap = {};
  let dataMap = {};

  console.log('teste');

  if (typeof window !== 'undefined') {
    originMap = {
      'Original-Url': window.location.pathname + window.location.search,
    };
  }

  if (useData) {
    dataMap = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }

  return {
    ...dataMap,
    ...originMap,
  };
}

async function handleAuth(response: Response) {
  if (response.status !== 401) return;

  if (typeof window !== 'undefined') {
    const { redirectUrl } = await response.json();
    window.location.replace(redirectUrl);
  }

  throw {
    status: 401,
    message: 'Unauthorized',
  } satisfies HttpError<undefined>;
}

export function createHttpClient(ms: Microservices) {
  const baseUrl = 'http://localhost:8081';

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
        headers: buildHeaders(),
      }),

    post: <T, J>(uri: string, data?: J, v = 1) =>
      request<T, J>(buildUrl(uri, v), {
        method: 'POST',
        headers: buildHeaders(data !== undefined),
        body: data ? JSON.stringify(data) : undefined,
      }),

    patch: <T, J>(uri: string, data?: J, v = 1) =>
      request<T, J>(buildUrl(uri, v), {
        method: 'PATCH',
        headers: buildHeaders(data !== undefined),
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: <T>(uri: string, v = 1) =>
      request<T, undefined>(buildUrl(uri, v), {
        method: 'DELETE',
        headers: buildHeaders(),
      }),
  };
}
