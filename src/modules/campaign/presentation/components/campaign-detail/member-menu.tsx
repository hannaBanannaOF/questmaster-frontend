'use client';

import { ExternalLink } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Menu } from '@/src/design';
import type { FormState } from '@/src/lib/actions';
import { ConfirmDialog } from '@/src/modules/shared/presentation';

interface MemberMenuProps {
  /** Nome acessível do botão "⋯". */
  label: string;
  openLabel: string;
  openHref?: string;
  /** A ação destrutiva (sair, remover, excluir), sempre por último e confirmada. */
  destructive: {
    label: string;
    icon: ReactNode;
    action: (state: FormState, formData: FormData) => Promise<FormState>;
    title: string;
    description: string;
    confirm: string;
    cancel: string;
    close: string;
    errorTitleKey: string;
  };
}

/** "⋯" de um card da party ou das fichas prontas, com a confirmação da ação. */
export function MemberMenu({
  label,
  openLabel,
  openHref,
  destructive,
}: MemberMenuProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <Menu
        label={label}
        items={[
          ...(openHref
            ? [
                {
                  key: 'open',
                  label: openLabel,
                  href: openHref,
                  icon: <ExternalLink />,
                },
              ]
            : []),
          {
            key: 'destructive',
            label: destructive.label,
            icon: destructive.icon,
            danger: true,
            onSelect: () => setConfirming(true),
          },
        ]}
      />
      <ConfirmDialog
        open={confirming}
        onClose={() => setConfirming(false)}
        action={destructive.action}
        title={destructive.title}
        description={destructive.description}
        confirmLabel={destructive.confirm}
        cancelLabel={destructive.cancel}
        closeLabel={destructive.close}
        errorTitleKey={destructive.errorTitleKey}
        icon={destructive.icon}
      />
    </>
  );
}
