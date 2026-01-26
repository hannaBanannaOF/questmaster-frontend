'use client';

import { CampaingDetailItem } from "@/src/domain/campaing";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { getRpgKindIcon, getRpgKindLabel } from "@/src/shared/ui/rpg-kind.ui";
import { ScheduleSessionController } from "@/src/shared/ui/schedule-session-modal";
import { ActionIcon, Avatar, Badge, Group, Menu, Skeleton, Stack, Tabs, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TbLink, TbPlayerPlay, TbPlayerStop, TbSettings } from "react-icons/tb";
import { CampaingCharacterList } from "./campaing-character-list";
import { CampaingInviteLinkController } from "./campaing-invite-link-modal";

export function CampaingDetail({ id }:{ id: number }) {
  
  const client = useHttpClient(Microservices.core);
  const queryClient = useQueryClient();
  const t = useTranslations('campaingDetail')
  const {data, isFetching } = useQuery({
    queryKey: ['my-campaings', id],
    queryFn: async () => {
      return await client.get(`/campaing/${id}`) as CampaingDetailItem;
    },
  });

  const updateInPlayMutation = useMutation({
    mutationFn: async (id: number) => {
      return await client.put(`/campaing/${id}/toggle-in-play`).then(data => {
        notifications.show({
          color: 'green',
          message: t(data.inPlay ? 'notifications.sessionStart' : 'notifications.sessionStop'),
          position: 'top-right'
        })
        return data 
      }) as CampaingDetailItem
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['my-campaings', id], newData);
    }
  })

  return <CampaingInviteLinkController campaingId={id} renderModal={data?.dmed}>
    {(openCampaingInvite) => <Skeleton visible={!data && isFetching}>
      <Stack>
        <div>
          <Group justify="space-between">
            <Group align="flex-start">
              {data?.system && <Avatar>{getRpgKindIcon(data?.system)}</Avatar>}
              <div>
                <Title>{data?.name}</Title>
                <Group>
                  <Text c="dimmed">{getRpgKindLabel(data?.system)}</Text>
                  {data?.inPlay && <Badge color="green" variant="light">{t('status.inPlay')}</Badge>}
                </Group>
              </div>
            </Group>
            {data?.dmed && <ScheduleSessionController campaingId={id}>
              {(openSchedule) => <Menu position="bottom-start">
                <Menu.Target>
                  <ActionIcon variant="subtle">
                    <TbSettings size={24}/>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => {
                    updateInPlayMutation.mutate(data?.id)
                  }} leftSection={!data.inPlay ? <TbPlayerPlay /> : <TbPlayerStop />}>
                    {data?.inPlay && t('menu.stopSession')}
                    {!data?.inPlay && t('menu.startSession')}
                  </Menu.Item>
                  <Menu.Item onClick={openSchedule}>{t('menu.scheduleSession')}</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<TbLink />} onClick={openCampaingInvite}>
                    {t('menu.inviteLink')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>}
            </ScheduleSessionController>}
          </Group>
        </div>
        {data?.overview && <Text c="dimmed" fs="italic" lineClamp={6}>{data?.overview}</Text>}
        <Tabs defaultValue="characters" mt={"lg"} variant="outline" keepMounted={false}>
          <Tabs.List mb={"md"}>
            <Tabs.Tab value="characters">
              {t('tabs.characters.title')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="characters">
            <CampaingCharacterList characters={data?.characters ?? []} dmed={data?.dmed} openInvite={open}/>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Skeleton>}
  </CampaingInviteLinkController>
}