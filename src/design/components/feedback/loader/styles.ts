import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-6px) rotate(5deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(-6px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const IconWrapper = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  color: ${({ theme }) => theme.colors.primary.default};
`;
