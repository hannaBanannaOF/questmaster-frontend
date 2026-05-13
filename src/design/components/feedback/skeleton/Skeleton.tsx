'use client';
import { PropsWithChildren } from 'react';
import { Shimmer } from 'shimmer-from-structure';
import { useTheme } from 'styled-components';

interface SkeletonProps extends PropsWithChildren {
  loading?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ loading, children }) => {
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
};
