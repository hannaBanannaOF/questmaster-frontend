'use client';

import { AppShell, Button, Group, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export function Shell({children}: {children: React.ReactNode}) {

  const router = useRouter();

  return <AppShell header={{ height: 80 }} padding="xl">
    <AppShell.Header>
      <Group h="100%" px="lg" justify="space-between">
        <Title order={2}>QuestMaster</Title>
        <Group gap={"md"}>
          <Button variant="transparent" onClick={() => {
            router.push("/")
          }}>Dashboard</Button>
          <Button variant="transparent" onClick={() => {
            router.push("/sessions")
          }}>Sessões</Button>
          <Button variant="transparent" onClick={() => {
            router.push("/character-sheets")
          }}>Fichas</Button>
        </Group>
      </Group>
    </AppShell.Header>
    <AppShell.Main>
      {children}
    </AppShell.Main>
  </AppShell>
}