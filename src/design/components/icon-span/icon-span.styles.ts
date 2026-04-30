import styled from 'styled-components';

export const IconSpan = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  color: ${({ $color, theme }) => $color ?? theme.colors.text.primary};
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.body.fontSize.sm};
`;
