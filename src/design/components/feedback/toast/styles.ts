import styled, { DefaultTheme } from 'styled-components';

import { Card } from '../../layout/card/styles';
import { ToastType } from './types';

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;
`;

const variantStyles = (theme: DefaultTheme) => ({
  error: theme.colors.destructive.default,
  success: theme.colors.constructive.default,
  info: '',
});

export const ToastItem = styled(Card)<{ $type: ToastType }>`
  pointer-events: auto; 
  border-left: 2px solid ${({ theme, $type }) => variantStyles(theme)[$type]};
`;