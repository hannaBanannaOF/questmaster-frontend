import styled from 'styled-components';

export const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.soft};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.primary.default};
`;
