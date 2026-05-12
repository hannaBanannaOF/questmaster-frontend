import { createContext } from 'react';

import { BrightnessMode } from './types';

type ThemeContextType = {
  mode: BrightnessMode;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
