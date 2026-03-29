import styled from 'styled-components';

export const Main = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl}
    0 ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
