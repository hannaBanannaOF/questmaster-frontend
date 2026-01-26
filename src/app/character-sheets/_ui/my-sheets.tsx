'use client';

import { CharacterSheetListItem } from "@/src/domain/character";
import { useHttpClient } from "@/src/shared/hooks/useHttpClient";
import { Microservices } from "@/src/shared/types/services";
import { EmptyStateCard } from "@/src/shared/ui/empty-state-card";
import { getRpgKindIcon, getRpgKindLabel } from "@/src/shared/ui/rpg-kind.ui";
import { Avatar, Button, Card, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { CreateCharacterController } from "./create-character-modal";

export function MySheets() {
  
  const client = useHttpClient(Microservices.core);
  const t = useTranslations('mySheets');
  
  const {data, isFetching } = useQuery({
    queryKey: ['my-character-sheets'],
    queryFn: async () => {
      return await client.get('/me/sheets') as CharacterSheetListItem[];
    },
  });

  return <CreateCharacterController>
    {(open) => <Stack>
      <Group justify="space-between">
        <Title order={3}>{t('title')}</Title>
        {data && data.length > 0 &&<Button variant="light" onClick={open}>{t('newCharacter.button.label')}</Button>}
      </Group>
      <Skeleton visible={isFetching && !data}>
        {data && data.length > 0 && <Stack>
          {data.map((s) => <Card<typeof Link>
            key={s.slug}
            component={Link}
            href={`/character-sheets/${s.slug}`}
            px="lg"
            withBorder
          >
            <Group justify="space-between" align="center" wrap="nowrap">
              {/* Esquerda: ícone + conteúdo */}
              <Group align="flex-start" gap="md" wrap="nowrap">
                {/* Ícone do sistema */}
                <Avatar size={44} variant="light">{getRpgKindIcon(s.system)}</Avatar>
                {/* Conteúdo */}
                <div>
                  {/* Título */}
                  <Title order={4}>{s.name}</Title>
                  {/* Subtítulo */}
                  <Text size="sm" c="dimmed">{getRpgKindLabel(s.system)}</Text>
                </div>
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
  </CreateCharacterController>
}