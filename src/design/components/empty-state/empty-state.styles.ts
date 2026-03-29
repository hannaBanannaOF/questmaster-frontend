import styled from 'styled-components';

export const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.soft};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.primary.default};
`;
