import styled from 'styled-components';

export const StylesLine = styled.span<{ $vertical?: boolean }>`
  display: block;
  border: 0;
  margin: 0;

  ${({ $vertical, theme }) =>
    !$vertical
      ? `
        width: 100%;
        border-top: 1px solid ${theme.colors.card.border};
      `
      : `
        align-self: stretch;
        border-left: 1px solid ${theme.colors.card.border};
      `}
`;
