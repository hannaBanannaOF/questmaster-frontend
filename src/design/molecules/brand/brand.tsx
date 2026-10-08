import Link from 'next/link';
import type { ReactNode } from 'react';

import { IconBox } from '../../atoms/icon-box/icon-box';
import { Stack } from '../../atoms/stack/stack';
import { Text } from '../../atoms/text/text';
import { Title } from '../../atoms/title/title';

interface BrandProps {
  name: string;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
}

export function Brand({ name, subtitle, icon, href = '/' }: BrandProps) {
  return (
    <Link href={href} aria-label={name}>
      <Stack align="center">
        {icon && (
          <IconBox tone="primary" size="sm">
            {icon}
          </IconBox>
        )}
        <Stack direction="column" gap="xxs">
          <Title order={2}>{name}</Title>
          {subtitle && (
            <Text tone="muted" small>
              {subtitle}
            </Text>
          )}
        </Stack>
      </Stack>
    </Link>
  );
}
