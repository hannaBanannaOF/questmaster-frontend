import { DefaultTheme } from 'styled-components';

import { ThemeColors, themeColors } from './colors.style';
import { ThemeRadius, themeRadius } from './radius.style';
import { ThemeSpacing, themeSpacing } from './spacing.style';
import { ThemeTypography, themeTypography } from './typography.style';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: ThemeTypography;
    colors: ThemeColors;
    spacing: ThemeSpacing;
    radius: ThemeRadius;
  }
}

export const theme: DefaultTheme = {
  typography: themeTypography,
  radius: themeRadius,
  colors: themeColors,
  spacing: themeSpacing,
};
