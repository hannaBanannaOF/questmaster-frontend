export const getEnv = (key: 'CORE_API_URL' | 'SESSION_COOKIE_NAME') => {
  if (typeof window !== 'undefined') {
    // @ts-expect-error "No enviroment key found"
    return window.ENV?.[key] || process.env[`NEXT_PUBLIC_${key}`];
  }
  return process.env[key]; // No servidor (SSR), ele pega direto do processo
};
