export const FLASH_COOKIE = 'qm_flash';

/**
 * Toast que precisa sobreviver a um redirect() de Server Action.
 * `title`/`message` são chaves de tradução completas (ex.: "campaign.toast...").
 */
export interface FlashMessage {
  type: 'info' | 'success' | 'error';
  title: string;
  message?: string;
  values?: Record<string, string | number>;
}
