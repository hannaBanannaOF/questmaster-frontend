'use client';

import { InviteCreateItem } from "@/src/domain/invite";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

function CampaingInviteLinkModal({ opened, close, campaingId } : { opened: boolean; close: () => void; campaingId: number }) {
  const t = useTranslations("campaingInviteLinkModal")  
  const [ invite, setInvite ] = useState<InviteCreateItem>()
  const [copied, setCopied] = useState(false)
  const client = useHttpClient(Microservices.core)

  const createInviteMutation = useMutation({
    mutationFn: async ({ data }: { data: { campaingId: number } }) => {
      return await client.post('/invite/create', data) as InviteCreateItem
    },
    onSuccess: (createInvite) => {
      setInvite(createInvite);
    }
  })

  useEffect(() => {
    if (!invite) {
      createInviteMutation.mutate({data: {campaingId: Number(campaingId)}})
    }
  }, [invite])

  return <Modal opened={opened} onClose={close}
    title={<Text size="md" fw={700}>{t('title')}</Text>} size={"lg"}>
    <Stack align="center">
      <Text ta="center">{t('body')}</Text>
      <Link href={`/invite/${invite?.hash}`}>{window.location.protocol}//{window.location.host}/invite/{invite?.hash}</Link>
      <Button onClick={
        async () => {
          if (!copied) {
            await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/invite/${invite?.hash}`);
            setCopied(true);
            setTimeout(() => {
              setCopied(false)
            }, 2000);
          }
        }
      } disabled={copied}>{copied ? t('button.copied.label') : t('button.copy.label')}</Button>
    </Stack>
  </Modal>
}

export function CampaingInviteLinkController({ children, campaingId, renderModal } : { children: (open: () => void) => ReactNode; campaingId: number; renderModal?: boolean }) {
  const [opened, { open, close }] = useDisclosure();
  return <>
    {children(open)}
    {renderModal && <CampaingInviteLinkModal opened={opened} close={close} campaingId={campaingId}/>}
  </>
}