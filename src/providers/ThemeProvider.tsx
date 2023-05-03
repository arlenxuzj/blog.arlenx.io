import React, { createContext } from 'react';

import { useColorScheme } from '@mui/material';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<{
  toggleTheme: () => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {}
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
