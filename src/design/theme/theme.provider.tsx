'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme } from './styles/theme.style';
import { ThemeContext } from './theme.context';
import StyledComponentsRegistry from './theme.registry';

type ThemeMode = 'dark' | 'light';

function getInitialMode(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

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
