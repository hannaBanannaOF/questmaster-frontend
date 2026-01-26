'use client';

import { AppShell, Group, Title, UnstyledButton } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const NavItem = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <UnstyledButton
      onClick={() => router.push(href)}
      style={{
        position: 'relative',
        padding: '6px 8px',
        fontSize: 'var(--mantine-font-size-sm)',
        color: isActive
          ? 'var(--mantine-color-gray-4)'
          : 'var(--mantine-color-gray-6)',
        outline: 'none',
        transition: 'color 120ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color =
          'var(--mantine-color-gray-4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = isActive
          ? 'var(--mantine-color-gray-4)'
          : 'var(--mantine-color-gray-6)';
      }}
    >
      {label}

      {isActive && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -4,
            height: 2,
            backgroundColor:
              'color-mix(in srgb, var(--mantine-color-questmaster-4), transparent 40%)',
            borderRadius: 2,
          }}
        />
      )}
    </UnstyledButton>
  );
};

export function Shell({children}: {children: React.ReactNode}) {

  return <AppShell header={{ height: 90 }} padding="xl">
    <AppShell.Header style={(theme) => ({
      borderBottom: `1px solid ${theme.colors.gray[7]+'4C'}`
    })}>
      <Group h="100%" px="lg" justify="space-between">
        <Title order={2}>QuestMaster</Title>
        <Group gap={"md"}>
          <NavItem label="Dashboard" href="/" />
          <NavItem label="Campanhas" href="/campaings" />
          <NavItem label="Fichas" href="/character-sheets" />
        </Group>
      </Group>
    </AppShell.Header>
    <AppShell.Main>
      {children}
    </AppShell.Main>
  </AppShell>
}