import { Microservices } from './enums';
export function useHttpClient(ms: Microservices) {
  const kcRedirect = "http://localhost:8080/realms/HBsites/protocol/openid-connect/auth?client_id=questmaster&response_type=code&redirect_uri=http://localhost:8081/oauth/callback&scope=openid";
  const baseUrl = 'http://localhost:8081'

  const get = async (uri: string, apiVersion?: number) => {
    return await fetch(`${baseUrl}/${ms}/api/v${apiVersion ?? 1}/${uri}`, {credentials: 'include', headers: typeof window !== "undefined" ? {
      'Original-Url': window.location.pathname + window.location.search
    } : undefined })
      .then(async response => {
        if (response.status == 401) {
          if (typeof window !== "undefined") {
            var { redirectUrl } = await response.json()
            window.location.replace(redirectUrl)
          }
        }
        if (!response.ok) {
          return Promise.reject(response)
        }
        if (response.status == 204) {
          return Promise.resolve();
        }
        return response.json()
      })
      .then(json => {
        if (json != null) {
          return json
        }
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  const put = async (uri: string, data?: any, apiVersion?: number) => {
    return await fetch(`${baseUrl}/${ms}/api/v${apiVersion ?? 1}/${uri}`, {
      credentials: 'include',  
      method: "PUT", 
      headers: data != null ? {
        'Content-Type': 'application/json;charset=UTF-8'
      } : undefined,
      body: data != null ? JSON.stringify(data) : undefined
    })
      .then(async response => {
        if (response.status == 401) {
          if (typeof window !== "undefined") {
            var { redirectUrl } = await response.json()
            window.location.replace(redirectUrl)
          }
        }
        if (!response.ok) {
          return Promise.reject(response)
        }
        if (response.status == 204) {
          return Promise.resolve();
        }
        return response.json()
      })
      .then(json => {
        if (json != null) {
          return json
        }
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  const post = async (uri: string, data?: any, apiVersion?: number) => {
    return await fetch(`${baseUrl}/${ms}/api/v${apiVersion ?? 1}/${uri}`, {
      credentials: 'include',  
      method: "POST", 
      headers: data != null ? {
        'Content-Type': 'application/json;charset=UTF-8'
      } : undefined,
      body: data != null ? JSON.stringify(data) : undefined
    })
      .then(async response => {
        if (response.status == 401) {
          if (typeof window !== "undefined") {
            var { redirectUrl } = await response.json()
            window.location.replace(redirectUrl)
          }
        }
        if (!response.ok) {
          return Promise.reject(response)
        }
        if (response.status == 204) {
          return Promise.resolve();
        }
        return response.json()
      })
      .then(json => {
        if (json != null) {
          return json
        }
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  const del = async (uri: string, apiVersion?: number) => {
    return await fetch(`${baseUrl}/${ms}/api/v${apiVersion ?? 1}/${uri}`, {credentials: 'include', method: "DELETE"})
      .then(async response => {
        if (response.status == 401) {
          if (typeof window !== "undefined") {
            var { redirectUrl } = await response.json()
            window.location.replace(redirectUrl)
          }
        }
        if (!response.ok) {
          return Promise.reject(response)
        }
        if (response.status == 204) {
          return Promise.resolve();
        }
        return response.json()
      })
      .then(json => {
        if (json != null) {
          return json
        }
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  return {
    get: get,
    put: put,
    post: post,
    delete: del,
    kcRedirect: kcRedirect
  }
}