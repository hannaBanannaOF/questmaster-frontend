'use client'

import { Microservices, TRpgKind } from "@/src/shared/enums";
import { useHttpClient } from "@/src/shared/useHttpClient";
import { Avatar, Box, Button, Card, Group, Indicator, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CalendarItem } from "../types";

export function Upcoming() {

  const capitalize = (str: string) => {
    if (str.length === 0) {
      return str; // Handle empty strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const t = useTranslations("home");
  const router = useRouter();
  const client = useHttpClient(Microservices.core);
  const { data, isFetching } = useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      return await client.get(`/me/sessions/upcoming`) as CalendarItem;
    },
  });

  return <Stack>
    <Title order={3}>{t("proximaSessao")}</Title>
    <Skeleton visible={!data && isFetching}>
      {data && <Card>
        <Group justify="space-between">
          <Group gap={"xl"}>
            <Indicator disabled={!data.dmed} label="DM" size={16} inline>
              <Avatar>
                {TRpgKind.getIcon(data.system)}
              </Avatar>
            </Indicator>
            <div style={{ flex: 1 }}>
              <Title order={4}>{capitalize(dayjs(data.date).format("dddd, DD/MM/YYYY HH:mm:ss"))}</Title>
              <Text c="dimmed">{TRpgKind.getLabel(data.system)} | {data.name}</Text>
            </div>
          </Group>
          <Button onClick={() => {
                router.push(`/sessions/${data.slug}`)
              }}>{t('ver')}</Button>
          </Group>
      </Card>} 
      {!data && <Box bd="3px dashed questmaster" bdrs={8} p={"md"}>
        <Stack align="center">
          <Title order={2}>{t('empty.title')}</Title>
          <Text>{t("empty.cta")}</Text>
          <Button variant="light">{t("empty.button")}</Button>
        </Stack>
      </Box>}
    </Skeleton>
  </Stack>
}