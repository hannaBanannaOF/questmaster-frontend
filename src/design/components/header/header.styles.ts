import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.card.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.card.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
`;
