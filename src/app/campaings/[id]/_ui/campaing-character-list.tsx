'use client';

import { CharacterSheetDetails } from "@/src/app/character-sheets/[id]/_ui/character-sheet-details";
import { CampaingDetailCharacter } from "@/src/domain/campaing";
import { EmptyStateCard } from "@/src/shared/ui/empty-state-card";
import { Avatar, Box, Button, Container, Group, Progress, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function CampaingCharacterList({characters, dmed, openInvite}: {characters: CampaingDetailCharacter[], dmed?: boolean, openInvite: () => void}) {
  const t = useTranslations("campaingCharacterList")
  const [ selectedCharacter, setSelectedCharacter ] = useState<number>()

  useEffect(() => {
    if (characters.length > 0) {
      setSelectedCharacter(characters[0].id);
    }
  }, [characters])

  return <Stack>
    <Title order={4}>{t('title')}</Title>
    { characters.length > 0 && <Group align="flex-start">
      <Box
        w={260}
        style={{
          borderRight: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <Stack gap={2} p="xs">
          {characters.map((char) => {
            const selected = char.id === selectedCharacter;

            return (
              <UnstyledButton
                key={char.id}
                onClick={() => setSelectedCharacter(char.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  backgroundColor: selected
                    ? 'color-mix(in srgb, var(--mantine-color-questmaster-5), transparent 60%)'
                    : 'transparent',
                  transition: 'background-color 150ms ease',
                }}
              >
                <Group gap="sm" wrap="nowrap">
                  <Avatar radius="xl" size={36}>
                    {char.name[0]}
                  </Avatar>

                  <Stack gap={2} style={{ flex: 1 }}>
                    <Text size="sm" fw={500} lineClamp={1}>
                      {char.name}
                    </Text>
                    <Progress value={((char.currentHp ?? 0) * 100) / (char.maxHp ?? 1)} color="red" h={3}/>
                  </Stack>
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </Box>  
      {selectedCharacter && <Box style={{ flexGrow: 1 }}><CharacterSheetDetails id={selectedCharacter} /></Box>}
    </Group>}
    {characters.length == 0 && <Container>
      <EmptyStateCard>
        <Stack align="center">
          <Title order={5}>{t("empty.title")}</Title>
          <Text>{t("empty.cta")}</Text>
          { dmed && <Button variant="light" onClick={() => {
            openInvite();
          }}>{t("empty.button")}</Button>}  
        </Stack>  
      </EmptyStateCard>
    </Container>}
  </Stack>
}