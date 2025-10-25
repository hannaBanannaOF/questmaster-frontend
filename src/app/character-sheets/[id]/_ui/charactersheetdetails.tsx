'use client';

import { Microservices } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { Container, Group, Progress, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CharacterSheetDetailItem } from "../../../types";

export function CharacterSheetDetails({ id }:{ id: number }) {
  
  const client = useHttpClient(Microservices.core);
  //const t = useTranslations('character-sheet')
  const {data, isFetching } = useQuery({
    queryKey: ['my-character-sheets', id],
    queryFn: async () => {
      return await client.get(`/character-sheet/${id}`) as CharacterSheetDetailItem;
    },
  });

  return <Skeleton visible={!data && isFetching}>
    <Container>
      <Stack>
        <div>
          <Title order={2}>{data?.name}</Title>
          <div>
            <Group justify="space-between">
              <Text>HP</Text>
              <Text c="dimmed">{data?.currentHp}/{data?.maxHp}</Text>
            </Group>
            <Progress value={((data?.currentHp ?? 0) * 100) / (data?.maxHp ?? 1)} color="red"/>
          </div>
        </div>
      </Stack>
    </Container>
  </Skeleton>
  
}