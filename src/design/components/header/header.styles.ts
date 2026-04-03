import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.card.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.card.border} 0%,
    ${({ theme }) => theme.colors.primary.default} 50%,
    ${({ theme }) => theme.colors.card.border} 100%
  );
  border-image-slice: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
