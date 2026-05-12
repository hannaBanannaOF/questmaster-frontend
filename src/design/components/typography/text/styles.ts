import styled from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

import { TextVariant } from './types';

const variantStyles = (theme: DefaultTheme) => ({
  ['muted']: `
    color: ${theme.colors.text.muted};
  `,
  ['bold']: `
    font-weight: 600;
  `
});

export const Text = styled.p<{
  $variant?: TextVariant;
  $small?: boolean;
}>`
  ${({ $variant, theme }) => $variant && variantStyles(theme)[$variant]};

  ${({ $small, theme }) =>
    $small &&
    `
      font-size: ${theme.typography.body.fontSize.sm};
  `}
`;
