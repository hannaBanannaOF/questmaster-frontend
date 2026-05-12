'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme } from './styles/theme';
import { ThemeContext } from './ThemeContext';
import StyledComponentsRegistry from './ThemeRegistry';
import { BrightnessMode } from './types';

function getInitialMode(): BrightnessMode {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BrightnessMode>(getInitialMode);

  // sincroniza HTML + storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  function toggleTheme() {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <StyledComponentsRegistry>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </StyledComponentsRegistry>
    </ThemeContext.Provider>
  );
}
