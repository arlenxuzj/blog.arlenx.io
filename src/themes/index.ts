import { createTheme } from '@mui/material';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { darkPalette, lightPalette } from './palette';
import { darkCssVarsPalette } from './palette/darkPalette';
import { lightCssVarsPalette } from './palette/lightPalette';
import { typography } from './typography';

declare module '@mui/material/styles' {
  interface CssVarsThemeOptions {
    shape: {
      borderRadius?: number;
      'borderRadius-xs'?: number;
      'borderRadius-sm'?: number;
      'borderRadius-md'?: number;
      'borderRadius-lg'?: number;
      'borderRadius-xl'?: number;
    };
  }

  interface Shape {
    borderRadius: number;
    'borderRadius-xs': number;
    'borderRadius-sm': number;
    'borderRadius-md': number;
    'borderRadius-lg': number;
    'borderRadius-xl': number;
  }

  interface Theme {
    shape: Shape;
  }

  interface BreakpointOverrides {
    '2xl': true;
  }
}
export const lightTheme = createTheme({
  typography: typography,
  palette: {
    mode: 'light',
    ...lightPalette
  }
});

export const darkTheme = createTheme({
  typography: typography,
  palette: {
    mode: 'dark',
    ...darkPalette
  }
});

export const cssVariableTheme = extendTheme({
  cssVarPrefix: '',
  colorSchemes: {
    light: {
      palette: lightCssVarsPalette
    },
    dark: {
      palette: darkCssVarsPalette
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },
  shape: {
    borderRadius: 4,
    'borderRadius-xs': 4,
    'borderRadius-sm': 8,
    'borderRadius-md': 12,
    'borderRadius-lg': 16,
    'borderRadius-xl': 20
  },
  typography: typography
});
