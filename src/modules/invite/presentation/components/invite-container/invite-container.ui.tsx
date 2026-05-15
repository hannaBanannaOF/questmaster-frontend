import { Check, Copy, Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  ClipboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Button } from '@/src/design';

import { useCreateInvite } from '../../intive.hooks';
import * as S from './invite-container.styles';

interface InviteContainerProps {
  campaignId: number;
  hash?: string;
}

export function InviteContainer({ campaignId, hash }: InviteContainerProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const t = useTranslations('invite');

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const fullUrl = useMemo(
    () => `${window.location.origin}/join/${hash}`,
    [hash],
  );

  const handleCopyButtonClick = useCallback(async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
  }, [fullUrl]);

  const handleCopyEvent = useCallback(
    (e: ClipboardEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.clipboardData.setData('text/plain', fullUrl);
      setCopied(true);
    },
    [fullUrl],
  );

  const { mutate: createInvite, isPending } = useCreateInvite();

  const handleCreateButtonClick = useCallback(() => {
    createInvite(campaignId);
  }, [createInvite, campaignId]);

  if (!hash)
    return (
      <Button
        icon={<Link2 size={12} display="flex" />}
        variant="outline"
        text={t('create')}
        loading={isPending}
        onClick={handleCreateButtonClick}
      />
    );

  return (
    <S.InviteHashWrapper>
      <S.InviteHashSpan onCopy={handleCopyEvent}>/join/{hash}</S.InviteHashSpan>

      <S.InviteHashCopyButton onClick={handleCopyButtonClick} disabled={copied}>
        {copied ? (
          <>
            <Check size={12} display="flex" />
            {t('copied')}
          </>
        ) : (
          <>
            <Copy size={12} display="flex" />
            {t('copy')}
          </>
        )}
      </S.InviteHashCopyButton>
    </S.InviteHashWrapper>
  );
}
