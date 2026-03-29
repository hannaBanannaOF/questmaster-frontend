import { createContext } from 'react';

type ThemeContextType = {
  mode: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
