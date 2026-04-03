import styled from 'styled-components';

export const Text = styled.p<{
  $muted?: boolean;
  $small?: boolean;
}>`
  ${({ $muted, theme }) =>
    $muted &&
    `
      color: ${theme.colors.text.muted};
  `}

  ${({ $small, theme }) =>
    $small &&
    `
      font-size: ${theme.typography.body.fontSize.sm};
  `}
`;
