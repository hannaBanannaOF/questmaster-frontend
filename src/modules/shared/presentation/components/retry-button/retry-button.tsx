'use client';

import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/src/design';

/** Busca os dados da página de novo, sem recarregar o navegador. */
export function RetryButton({
  label,
  variant = 'tertiary',
  onRetry,
}: {
  label: string;
  variant?: 'primary' | 'tertiary';
  /** Roda junto com o refresh (ex.: o `reset` do error boundary). */
  onRetry?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={variant}
      icon={<RotateCw size={18} />}
      loading={isPending}
      onClick={() =>
        startTransition(() => {
          router.refresh();
          onRetry?.();
        })
      }
    >
      {label}
    </Button>
  );
}
