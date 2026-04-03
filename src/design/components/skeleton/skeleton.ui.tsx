'use client';
import { ReactNode } from 'react';
import { Shimmer } from 'shimmer-from-structure';
import { useTheme } from 'styled-components';

export default function Skeleton({
  loading,
  children,
}: {
  loading?: boolean;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Shimmer
      backgroundColor={theme.colors.card.background}
      loading={loading}
      fallbackBorderRadius={8}
    >
      {children}
    </Shimmer>
  );
}
