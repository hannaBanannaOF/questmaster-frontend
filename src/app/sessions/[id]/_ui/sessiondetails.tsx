'use client';

import { Microservices, TRpgKind } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { ActionIcon, Badge, Group, Menu, Skeleton, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TbSettings } from "react-icons/tb";
import { SessionDetailItem } from "../../../types";
import { CharacterList } from "./characterlist";

export function SessionDetail({ id }:{ id: number }) {
  
  const client = useHttpClient(Microservices.core);
  const queryClient = useQueryClient();
  const t = useTranslations('session')
  const {data, isFetching } = useQuery({
    queryKey: ['my-sessions', id],
    queryFn: async () => {
      return await client.get(`/session/${id}`) as SessionDetailItem;
    },
  });

  const updateInPlayMutation = useMutation({
    mutationFn: async (id: number) => {
      return await client.put(`/session/${id}/toggle-in-play`).then(data => {
        notifications.show({
          color: 'green',
          message: t(data.inPlay ? 'notifications.playing' : 'notifications.not_playing'),
          position: 'top-right'
        })
        return data 
      }) as SessionDetailItem
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['my-sessions', id], newData);
    }
  })

  return <Skeleton visible={!data && isFetching}>
    <Group align="top" gap={"xl"}>
      <CharacterList characters={data?.characters ?? []} />
      <Stack>
        <div>
          <Group>
            <Title order={2}>{data?.name}</Title>
            {data?.dmed && <Menu position="bottom-start">
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <TbSettings size={24}/>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => {
                  updateInPlayMutation.mutate(data?.id)
                }}>
                  Toggle inplay status
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>}
          </Group>
          <Group>
            <Text c="dimmed">{TRpgKind.getLabel(data?.system)}</Text>
            {data?.inPlay && <Badge color="green" variant="light">{t('in_play')}</Badge>}
          </Group>
        </div>
        {data?.overview && <Text c="dimmed" fs="italic" lineClamp={6}>{data?.overview}</Text>}
      </Stack>
    </Group>
  </Skeleton>
  
}