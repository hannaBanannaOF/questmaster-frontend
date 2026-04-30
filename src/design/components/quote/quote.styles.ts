import styled from 'styled-components';

export const StyledQuote = styled.blockquote`
  padding: ${({ theme }) => theme.spacing.md};
  border-left: 2px solid ${({ theme }) => theme.colors.primary.soft};
  text-align: start;
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
  margin: 0;
`;
