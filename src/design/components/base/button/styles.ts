import { Loader } from 'lucide-react';
import styled, { css, DefaultTheme } from 'styled-components';

import { ButtonColor, ButtonVariant } from './types';

const getThemeColor = (theme: DefaultTheme, color: ButtonColor) => {
  switch (color) {
    case 'danger':
      return theme.colors.destructive;
    default:
      return theme.colors.primary;
  }
};

const variantStyles = (theme: DefaultTheme, color: ButtonColor) => ({
  muted: css`
    background-color: ${theme.colors.card.foreground};
    color: ${theme.colors.text.primary};
    border: none;
    box-shadow: 0 4px 6px hsla(0 0% 0% / 0.1);
    &:not(:disabled):hover {
      filter: brightness(1.2);
    }
  `,
  outline: css`
    background-color: transparent;
    border: 1px solid ${getThemeColor(theme, color).default};
    color: ${getThemeColor(theme, color).default};
    box-shadow: 0 4px 6px hsla(0 0% 0% / 0.1);
    &:not(:disabled):hover {
      background-color: ${getThemeColor(theme, color).soft};
      filter: brightness(1.1);
    }
  `,
  default: css`
    background-color: ${getThemeColor(theme, color).default};
    border: 0;
    color: ${theme.colors.text.contrast};
    box-shadow: 0 4px 6px hsla(0 0% 0% / 0.1);
    &:hover {
      filter: brightness(1.1);
    }
  `,
  text: css`
    background-color: transparent;
    border: 0;
    font-weight: 600;
    color: ${theme.colors.text.muted};
    &:not(:disabled):hover {
      color: ${theme.colors.text.primary};
    }
  `,
});

export const Button = styled.button<{
  $variant: ButtonVariant;
  $color: ButtonColor;
  $loading?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.md};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $variant, $color, theme }) => variantStyles(theme, $color)[$variant]};

  &:not(disabled):active {
    filter: contrast(1.2);
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    filter: grayscale(0.5);
    box-shadow: none;
    pointer-events: none;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}
`;

export const LoadingIcon = styled(Loader)`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
`;
