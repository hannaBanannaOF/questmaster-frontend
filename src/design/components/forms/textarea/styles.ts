import styled from 'styled-components';

import { InputBase } from '../input/styles';

export const StyledTextArea = styled(InputBase)`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
`;
