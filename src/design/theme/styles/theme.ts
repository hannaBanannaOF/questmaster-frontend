import { DefaultTheme } from 'styled-components';

import { ThemeColors, themeColors } from './colors';
import { ThemeRadius, themeRadius } from './radius';
import { ThemeSpacing, themeSpacing } from './spacing';
import { ThemeTypography, themeTypography } from './typography';

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
