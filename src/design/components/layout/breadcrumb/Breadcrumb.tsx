'use client';

import { ChevronRight } from 'lucide-react';
import { useTheme } from 'styled-components';

import { Text } from '../../typography/text/Text';
import { Container } from '../container/Container';
import { NavItem } from '../nav-item/NavItem';

interface BreadcrumbProps {
  segments: { href?: string; label: string }[];
}

export function Breadcrumb(props: BreadcrumbProps) {
  const theme = useTheme();

  return (
    <Container align="center">
      {props.segments &&
        props.segments.map((segment, index) => {
          const isLast = index === props.segments.length - 1;

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
