import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ClipboardEvent, useEffect, useState } from 'react';

import * as S from './campaign.styles';

function CampaignInviteContainer({ hash }: { hash: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const t = useTranslations('campaign.invite');

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const getFullUrl = () => `${window.location.origin}/join/${hash}`;

  const handleButtonClick = async () => {
    await navigator.clipboard.writeText(getFullUrl());
    setCopied(true);
  };

  const handleCopyEvent = (e: ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const fullUrl = getFullUrl();
    e.clipboardData.setData('text/plain', fullUrl);
    setCopied(true);
  };

  return (
    <S.InviteHashWrapper>
      <S.InviteHashSpan onCopy={handleCopyEvent}>/join/{hash}</S.InviteHashSpan>

      <S.InviteHashCopyButton onClick={handleButtonClick} disabled={copied}>
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
