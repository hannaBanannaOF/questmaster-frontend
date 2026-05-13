import styled from 'styled-components';

import { InputBase } from '../input/styles';

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledSelect = styled(InputBase)`
  appearance: none;
  width: 100%;
  padding-right: 40px;
  &:not(:disabled) {
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 12px;
  pointer-events: none;
  display: flex;
  color: ${({ theme }) => theme.colors.text.muted};
`;
