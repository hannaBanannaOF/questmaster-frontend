'use client';
import { PropsWithChildren } from 'react';
import { Shimmer } from 'shimmer-from-structure';
import { useTheme } from 'styled-components';

interface SkeletonProps extends PropsWithChildren {
  loading?: boolean
}

export function Skeleton(props: SkeletonProps) {
  const theme = useTheme();
  return (
    <Shimmer
      backgroundColor={theme.colors.card.background}
      loading={props.loading}
      fallbackBorderRadius={8}
    >
      {props.children}
    </Shimmer>
  );
}
