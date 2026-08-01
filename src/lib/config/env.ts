// src/shared/config/env.ts
interface Config {
  CORE_API_URL: string;
  SESSION_COOKIE_NAME: string;
}

let runtimeConfig: Config | null = null;

export async function loadRuntimeConfig(): Promise<Config> {
  if (runtimeConfig) return runtimeConfig;

  try {
    const res = await fetch('/api/env');
    const data = await res.json();
    runtimeConfig = data;
    return data;
  } catch (error) {
    console.error('Falha ao carregar configurações de runtime:', error);
    return { CORE_API_URL: '', SESSION_COOKIE_NAME: '' };
  }
}

export function getRuntimeConfig(): Config {
  return runtimeConfig ?? { CORE_API_URL: '', SESSION_COOKIE_NAME: '' };
}