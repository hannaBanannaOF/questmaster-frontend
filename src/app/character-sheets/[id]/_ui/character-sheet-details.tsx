'use client';

import { CharacterSheetDetailItem } from "@/src/domain/character";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { Group, Progress, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export function CharacterSheetDetails({ id }:{ id: number }) {
  
  const client = useHttpClient(Microservices.core);
  const t = useTranslations('characterSheetDetails')
  const {data, isFetching } = useQuery({
    queryKey: ['my-character-sheets', id],
    queryFn: async () => {
      return await client.get(`/character-sheet/${id}`) as CharacterSheetDetailItem;
    },
  });

  return <Skeleton visible={!data && isFetching}>
    <Stack>
      <div>
        <Title order={2}>{data?.name}</Title>
        <div>
          <Group justify="space-between">
            <Text>{t('hp.label')}</Text>
            <Text c="dimmed">{data?.currentHp}/{data?.maxHp}</Text>
          </Group>
          <Progress value={((data?.currentHp ?? 0) * 100) / (data?.maxHp ?? 1)} color="red"/>
        </div>
      </div>
    </Stack>
  </Skeleton>
  
}