'use client';

import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Avatar, Badge, Button, Card, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { CampaingListItem } from "@/src/domain/campaing";
import { Microservices } from "@/src/shared/types/services";
import { EmptyStateCard } from "@/src/shared/ui/empty-state-card";
import { getRpgKindIcon, getRpgKindLabel } from "@/src/shared/ui/rpg-kind.ui";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { CreateCampaingController } from "./create-campaing-modal";

export function MyCampaings() {
  
  const client = useHttpClient(Microservices.core);
  const router = useRouter();
  const t = useTranslations('myCampaings');
  
  const {data, isFetching } = useQuery({
    queryKey: ['my-campaings'],
    queryFn: async () => {
      return await client.get('/me/campaings') as CampaingListItem[];
    },
  });

  return <CreateCampaingController>
    {(open) => <Stack>
      <Group justify="space-between">
        <Title order={3}>{t('title')}</Title>
        {data && data.length > 0 && <Button variant="light" onClick={open}>{t('newCampaing.button.label')}</Button>}
      </Group>
      <Skeleton visible={isFetching && !data}>
        {data && data.length > 0 && <Stack>
          {data.map((s) => 
            <Card<typeof Link>
              key={s.slug}
              component={Link}
              href={`/campaings/${s.slug}`}
              px="lg"
              withBorder
            >
              <Group justify="space-between" align="center" wrap="nowrap">
                {/* Esquerda: ícone + conteúdo */}
                <Group align="flex-start" gap="md" wrap="nowrap">
                  {/* Ícone do sistema */}
                  <Avatar size={44} variant="light">{getRpgKindIcon(s.system)}</Avatar>
                  {/* Conteúdo */}
                  <Stack gap="md">
                    <div>
                      {/* Título */}
                      <Title order={4}>{s.name}</Title>
                      {/* Subtítulo */}
                      <Text size="sm" c="dimmed">{getRpgKindLabel(s.system)}</Text>
                    </div>
                    {/* Badges */}
                    <Group gap="xs" mt={4}>
                      {s.inPlay && <Badge variant="light" color="green" size="sm">{t('status.inPlay')}</Badge>}
                      {s.dmed && <Badge variant="light" color="questmaster" size="sm">{t('status.dm')}</Badge>}
                    </Group>
                  </Stack>
                </Group>

                {/* Direita: affordance */}
                <TbChevronRight size={24}/>
              </Group>
            </Card>)}  
        </Stack>}
        {!data || data.length == 0 && <EmptyStateCard>
          <Stack align="center">
            <Title order={2}>{t("empty.title")}</Title>
            <Text>{t("empty.cta")}</Text>
            <Button variant="light" onClick={open}>{t("empty.button")}</Button>
          </Stack>
        </EmptyStateCard>}
      </Skeleton>
    </Stack>}
  </CreateCampaingController>
  
}