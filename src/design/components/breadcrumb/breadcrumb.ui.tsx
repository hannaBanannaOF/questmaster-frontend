'use client';

import { ChevronRight } from 'lucide-react';
import { useTheme } from 'styled-components';

import { Container, NavItem, Text } from '@/src/design/design-system';

export default function Breadcrumb({
  segments,
}: {
  segments: { href?: string; label: string }[];
}) {
  const theme = useTheme();

  return (
    <Container align="center">
      {segments &&
        segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <Container key={index} align="center">
              {isLast || !segment.href ? (
                <Text>{segment.label}</Text>
              ) : (
                <NavItem href={segment.href} label={segment.label} notActive />
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  display="flex"
                  color={theme.colors.text.muted}
                />
              )}
            </Container>
          );
        })}
    </Container>
  );
}
