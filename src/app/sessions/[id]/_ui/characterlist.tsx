'use client';

import { Avatar, Box, Button, Group, Progress, Stack, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { SessionDetailCharacter } from "../../../types";

export function CharacterList({characters}: {characters: SessionDetailCharacter[]}) {

  const t = useTranslations("session")

  return <Stack>
    <Title order={5}>{t('characters.title')}</Title>
    {characters.length > 0 && characters.map((c) => <Group key={c.name}>
      <Avatar name={c.name} />
      <div style={{flex: 1}}>
      <Text>{c.name}</Text>
      <Progress value={((c.currentHp ?? 0) * 100) / (c.maxHp ?? 1)} color="red"/>
      </div>
    </Group>)}
    {characters.length == 0 && <Box bd="3px dashed questmaster" bdrs={8} p={"md"}>
      <Stack align="center">
        <Title order={5}>{t("characters.empty.title")}</Title>
        <Text>{t("characters.empty.cta")}</Text>
        <Button variant="light">{t("characters.empty.button")}</Button>  
      </Stack>
    </Box>}
  </Stack>
}