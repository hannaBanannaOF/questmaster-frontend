'use client';

import { CreateCharacterController } from "@/src/app/character-sheets/_ui/create-character-modal";
import { InviteDetailsItem } from "@/src/domain/invite";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { EmptyStateCard } from "@/src/shared/ui/empty-state-card";
import { Button, Container, Select, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function InviteDetails({ inviteHash }:{ inviteHash: string }) {
  
  const client = useHttpClient(Microservices.core);
  const t = useTranslations('inviteDetails')
  const router = useRouter()
  const [selected, setSelected] = useState<string|null>()
  const [error, setError] = useState<string>()
  const [ opened, { open, close } ] = useDisclosure()
  const {data, isFetching } = useQuery({
    queryKey: ['invite-details', inviteHash],
    queryFn: async () => {
      return await client.get(`/invite/${inviteHash}`) as InviteDetailsItem;
    },
  });

  const acceptInviteMutation = useMutation({
    mutationFn: async ({ data }: {data: { characterSheetId: number }}) => {
      return await client.post(`/invite/${inviteHash}/accept`, data) as { slug: string }
    },
    onSuccess: (data: any) => {
      router.push(`/campaings/${data.slug}`, {

      })
    }
  })

  return <Skeleton visible={!data && isFetching}>
    <Container>
      <Stack align="center">
        <Title>{t("title")}</Title>
        <Text>{t.rich('body', { sessionName: data?.campaingName ?? '', bold: (chunks) => <strong>{chunks}</strong> })}</Text>
        {(data?.availableCharacters ?? []).length > 0 && <>
          <Select data={data?.availableCharacters.map((c) => { 
            return {value: c.id.toString(), label: c.name}
          })} onChange={(v) => setSelected(v)} value={selected} error={error} label={t('form.availableCharacters.label')} disabled={acceptInviteMutation.isPending}>
          </Select>
          <Button onClick={() => {
            if (!selected) {
              setError(t('form.availableCharacters.error'))
            } else {
              setError(undefined)
              acceptInviteMutation.mutate({ data: { characterSheetId: Number(selected)} })
            }
          }} loading={acceptInviteMutation.isPending}>{t('button.acceptInvite.label')}</Button>
        </>}
        {(data?.availableCharacters ?? []).length == 0 && <EmptyStateCard>
          <Stack align="center">
            <Title order={2}>{t("empty.title")}</Title>
            <Text>{t("empty.cta")}</Text>
            <CreateCharacterController onCreate={async (newData) => {
              var res = await client.get(`/character-sheet/resolve/${newData.slug}`) as { coreId: number }
              acceptInviteMutation.mutate({ data: { characterSheetId: Number(res.coreId) } })
            }}>
              {(open) => <Button variant="light" onClick={open}>{t("empty.button")}</Button>}
            </CreateCharacterController>
          </Stack>
        </EmptyStateCard>}
      </Stack>
    </Container>
  </Skeleton>
  
}