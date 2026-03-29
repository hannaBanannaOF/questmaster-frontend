import styled from 'styled-components';

export const Text = styled.p<{
  $muted?: boolean;
}>`
  ${({ $muted, theme }) =>
    $muted &&
    `
      color: ${theme.colors.text.muted}
  `}
`;
