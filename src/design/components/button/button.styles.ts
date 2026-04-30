import styled, { DefaultTheme } from 'styled-components';

const variantStyles = (theme: DefaultTheme) => ({
  ['muted']: `
    background-color: ${theme.colors.card.foreground};
    color: ${theme.colors.text.primary};
    border: none;
  `,
  ['outline']: `
    background-color: transparent;
    border: 1px solid ${theme.colors.primary.default};
    color: ${theme.colors.primary.default};
  `,
  ['default']: `
    background-color: ${theme.colors.primary.default};
    border: 0;
    color: ${theme.colors.text.contrast};
  `,
});

export const Button = styled.button<{
  $variant: 'muted' | 'outline' | 'default';
}>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.md};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0 0% 0% / 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $variant, theme }) => variantStyles(theme)[$variant]};

  &:hover {
    filter: brightness(1.2);
    ${({ $variant, theme }) =>
      $variant === 'outline' &&
      `
        background-color: ${theme.colors.primary.soft};
    `};
  }

  &:active {
    filter: contrast(1.2);
    box-shadow: none;
  }
`;
