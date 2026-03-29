import styled from 'styled-components';

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.default};
  gap: ${({ theme }) => theme.spacing.xs};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0 0% 0% / 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.contrast};

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: contrast(1.2);
    box-shadow: none;
  }
`;
