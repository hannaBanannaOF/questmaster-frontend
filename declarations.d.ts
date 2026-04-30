declare module '*.css';

export {};
declare global {
  interface Window {
    ENV?: {
      CORE_API_URL: string;
      SESSION_COOKIE_NAME?: string;
    };
  }
}
