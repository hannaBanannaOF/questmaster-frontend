import { ButtonLink, Card, Stack, Text } from '@/src/design';

interface CrossRoleBannerProps {
  title: string;
  hint: string;
  href: string;
  action: string;
}

/** Lembra que o outro papel tem conteúdo e leva até a outra aba. */
export function CrossRoleBanner({
  title,
  hint,
  href,
  action,
}: CrossRoleBannerProps) {
  return (
    <Card compact>
      <Stack align="center" justify="space-between" wrap>
        <Text>
          <Text as="span" bold>
            {title}
          </Text>{' '}
          <Text as="span" tone="muted">
            {hint}
          </Text>
        </Text>
        <ButtonLink href={href} variant="outline">
          {action}
        </ButtonLink>
      </Stack>
    </Card>
  );
}
