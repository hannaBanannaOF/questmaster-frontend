import { ArrowLeft, SearchX } from 'lucide-react';

import { ButtonLink, EmptyState } from '@/src/design';

interface ResourceNotFoundProps {
  title: string;
  message: string;
  backHref: string;
  backLabel: string;
}

/** Conteúdo dos not-found.tsx: explica o que faltou e oferece um caminho de volta. */
export function ResourceNotFound({
  title,
  message,
  backHref,
  backLabel,
}: ResourceNotFoundProps) {
  return (
    <EmptyState
      title={title}
      message={message}
      icon={<SearchX size={48} />}
      action={
        <ButtonLink
          href={backHref}
          variant="outline"
          icon={<ArrowLeft size={16} />}
        >
          {backLabel}
        </ButtonLink>
      }
    />
  );
}
