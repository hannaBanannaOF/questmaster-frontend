import styled, { css } from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

import { TextVariant } from './types';

const variantStyles = (theme: DefaultTheme) => ({
  muted: css`
    color: ${theme.colors.text.muted};
  `,
  bold: css`
    font-weight: 600;
  `,
});

export const Text = styled.p<{
  $variant?: TextVariant;
  $small?: boolean;
  $uppercase?: boolean;
}>`
  ${({ $variant, theme }) => $variant && variantStyles(theme)[$variant]};

  ${({ $small, theme }) =>
    $small &&
    css`
      font-size: ${theme.typography.body.fontSize.sm};
    `}

  ${({ $uppercase }) =>
    $uppercase &&
    css`
      text-transform: uppercase;
    `}
`;
