'use client'

import { CalendarItem } from "@/src/domain/calendar";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { EmptyStateCard } from "@/src/shared/ui/empty-state-card";
import { getRpgKindIcon, getRpgKindLabel } from "@/src/shared/ui/rpg-kind.ui";
import { Avatar, Badge, Button, Card, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbChevronRight } from "react-icons/tb";
import { ScheduleSessionController } from "../../shared/ui/schedule-session-modal";

export function Upcoming() {

  const capitalize = (str: string) => {
    if (str.length === 0) {
      return str; // Handle empty strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const t = useTranslations("upcoming");
  const router = useRouter();
  const client = useHttpClient(Microservices.core);
  const { data, isFetching } = useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      let data = await client.get(`/me/upcoming`);
      if (data != undefined) {
        return data as CalendarItem;
      }
      return null;
    },
  });

  return <Stack>
    <Skeleton visible={!data && isFetching}>
      {data && <Stack>
        <Title order={2}>{t('title')}</Title>
        <Card<typeof Link>
          key={data.slug}
          component={Link}
          href={`/campaings/${data.slug}`}
          px="lg"
          withBorder
        >
          <Group justify="space-between" align="center" wrap="nowrap">
            {/* Esquerda: ícone + conteúdo */}
            <Group align="flex-start" gap="md" wrap="nowrap">
              {/* Ícone do sistema */}
              <Avatar size={44} variant="light">{getRpgKindIcon(data.system)}</Avatar>
              {/* Conteúdo */}
              <Stack gap="md">
                <div>
                  {/* Título */}
                  <Title order={4}>{data.name}</Title>
                  {/* Subtítulo */}
                  <Text size="sm" c="dimmed">{getRpgKindLabel(data.system)}</Text>
                </div>
                <div>
                  <Text fs={"italic"} c="dimmed">{dayjs(data.date).format("llll")}</Text>
                </div>
                {/* Badges */}
                <Group gap="xs" mt={4}>
                  {/* {data.inPlay && <Badge variant="light" color="green" size="sm">{t('status.inPlay')}</Badge>} */}
                  {data.dmed && <Badge variant="light" color="questmaster" size="sm">{t('status.dm')}</Badge>}
                </Group>
              </Stack>
            </Group>

            {/* Direita: affordance */}
            <TbChevronRight size={24}/>
          </Group>
        </Card>
      </Stack>} 
      {!data && <EmptyStateCard>
        <Stack align="center" gap="xs">
          <Title order={2}>{t('empty.title')}</Title>
          <Text>{t('empty.cta')}</Text>
          <ScheduleSessionController>
            {(open) => <Button variant="light" onClick={open}>
            {t('empty.button')}
          </Button>}
          </ScheduleSessionController>
        </Stack>
        <Text mt="sm" c="dimmed" fs="italic" size="sm">{t('empty.footer')}</Text>
      </EmptyStateCard>}
    </Skeleton>
  </Stack>
}