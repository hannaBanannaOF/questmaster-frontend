import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren, ReactElement } from 'react';

import { ToastProvider } from '@/src/design';
import campaign from '@/src/i18n/translations/pt-BR/campaign.json';
import character from '@/src/i18n/translations/pt-BR/character.json';
import common from '@/src/i18n/translations/pt-BR/common.json';
import dashboard from '@/src/i18n/translations/pt-BR/dashboard.json';
import invite from '@/src/i18n/translations/pt-BR/invite.json';

const messages = { common, campaign, character, invite, dashboard };

function Providers({ children }: PropsWithChildren) {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={messages}>
      <ToastProvider>{children}</ToastProvider>
    </NextIntlClientProvider>
  );
}

/** Renderiza com as mesmas traduções e toasts do layout do app. */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: Providers, ...options });
}
