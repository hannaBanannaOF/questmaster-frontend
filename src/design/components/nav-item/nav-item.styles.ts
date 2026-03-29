import Link from 'next/link';
import styled from 'styled-components';

export const NavItem = styled(Link)<{ $active?: boolean }>`
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  text-decoration: none;

  ${({ $active, theme }) =>
    (!$active &&
      `
      color: ${theme.colors.text.muted};

      &:hover {
        color: ${theme.colors.text.primary};
      }
    `) ||
    ($active &&
      `
      color: ${theme.colors.primary.default};
      background-color: ${theme.colors.primary.soft};
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      border-radius: ${theme.radius.md};
    `)}
`;
