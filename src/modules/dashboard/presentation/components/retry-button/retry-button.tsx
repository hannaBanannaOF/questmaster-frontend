'use client';

import { RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/src/design';

/** Busca os dados da página de novo, sem recarregar o navegador. */
export function RetryButton({ label }: { label: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      icon={<RotateCcw size={16} />}
      loading={isPending}
      onClick={() => startTransition(() => router.refresh())}
    >
      {label}
    </Button>
  );
}
