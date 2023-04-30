import React, { createContext, useEffect, useState } from 'react';

import { useColorScheme, useMediaQuery } from '@mui/material';

import siteMeta from '@/configs/siteMeta';

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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const svgIconLink = document.querySelector<HTMLLinkElement>(
      'link[type="image/svg+xml"][class="js-site-favicon"]'
    );
    const pngIconLink = document.querySelector<HTMLLinkElement>(
      'link[type="image/png"][class="js-site-favicon"]'
    );

    if (prefersDarkMode) {
      svgIconLink &&
        svgIconLink.setAttribute('href', siteMeta.favicons.svg.dark);

      pngIconLink &&
        pngIconLink.setAttribute('href', siteMeta.favicons.png.dark);
    } else {
      svgIconLink &&
        svgIconLink.setAttribute('href', siteMeta.favicons.svg.light);

      pngIconLink &&
        pngIconLink.setAttribute('href', siteMeta.favicons.png.light);
    }

    if (mounted) {
      if (prefersDarkMode) {
        setMode('dark');
        svgIconLink &&
          svgIconLink.setAttribute('href', siteMeta.favicons.svg.dark);

        pngIconLink &&
          pngIconLink.setAttribute('href', siteMeta.favicons.png.dark);
      } else {
        setMode('light');
        svgIconLink &&
          svgIconLink.setAttribute('href', siteMeta.favicons.svg.light);

        pngIconLink &&
          pngIconLink.setAttribute('href', siteMeta.favicons.png.light);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);

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
