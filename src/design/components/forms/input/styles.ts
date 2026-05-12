import styled from 'styled-components';

import { Text } from '../../typography/text/styles';

export const InputBase = styled.input`
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus-visible, &:focus {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.colors.background.primary}, 0px 0px 0px 4px ${({ theme }) => theme.colors.primary.default};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

export const InputLabel = styled.label`
  font-weight: 600;
`;

export const Required = styled.span`

  color: ${({ theme }) => theme.colors.destructive.default};

  &::after {
    content: " *";
  }

`;

export const Error = styled(Text)`
  color: ${({ theme }) => theme.colors.destructive.default};
`;