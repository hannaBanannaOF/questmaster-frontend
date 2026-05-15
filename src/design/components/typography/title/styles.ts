import styled from 'styled-components';

import { TitleVariant } from './types';

export const Title = styled.h1<{ $variant: TitleVariant }>`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  ${({ $variant, theme }) =>
    $variant === 'contrast' &&
    `
    color: ${theme.colors.text.contrast};
  `}
`;
