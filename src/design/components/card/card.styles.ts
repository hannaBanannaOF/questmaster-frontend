import styled from 'styled-components';

export const Card = styled.div`
  display: block;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.card.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &:hover {
    box-shadow: 0 0 15px 1px ${({ theme }) => theme.colors.primary.soft};
    border: 1px solid ${({ theme }) => theme.colors.primary.default};
  }
`;
