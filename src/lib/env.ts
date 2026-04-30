export const getEnv = (key: 'CORE_API_URL' | 'SESSION_COOKIE_NAME') => {
  if (typeof window !== 'undefined') {
    if (typeof window.ENV !== 'undefined') {
      return window.ENV?.[key];
    }
    if (key === 'CORE_API_URL') return process.env.NEXT_PUBLIC_CORE_API_URL;
    if (key === 'SESSION_COOKIE_NAME')
      return process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME;

    return undefined;
  }
  return process.env[key]; // No servidor (SSR), ele pega direto do processo
};
