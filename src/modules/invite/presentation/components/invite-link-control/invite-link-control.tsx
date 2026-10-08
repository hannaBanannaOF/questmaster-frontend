'use client';

import { Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Button, CopyField, useToast } from '@/src/design';
import type { ActionResult } from '@/src/lib/actions';
import { useErrorMessage } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { getInvitePath } from '../../../domain';

interface InviteLinkControlProps {
  hash?: string;
  /** Server Action já vinculada ao id da campanha. */
  createInvite: () => Promise<ActionResult<string>>;
}

/** Gera o link de convite da campanha ou, se já existe, permite copiá-lo. */
export function InviteLinkControl({
  hash,
  createInvite,
}: InviteLinkControlProps) {
  const t = useTranslations('invite');
  const { toast } = useToast();
  const errorMessage = useErrorMessage();
  const [isPending, startTransition] = useTransition();

  if (hash) {
    const path = getInvitePath(hash);
    return (
      <CopyField
        display={path}
        value={() => new URL(path, window.location.origin).toString()}
        copyLabel={t('copy')}
        copiedLabel={t('copied')}
      />
    );
  }

  const handleCreate = () =>
    startTransition(async () => {
      const result = await createInvite();
      toast(
        result.ok
          ? {
              type: 'success',
              title: t('toast.success.create.title'),
              message: t('toast.success.create.message'),
            }
          : {
              type: 'error',
              title: t('toast.error.create'),
              message: errorMessage(result.message),
            },
      );
    });

  return (
    <Button
      variant="outline"
      icon={<Link2 size={12} />}
      loading={isPending}
      onClick={handleCreate}
    >
      {t('create')}
    </Button>
  );
}
