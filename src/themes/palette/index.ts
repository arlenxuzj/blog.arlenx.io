export { default as darkPalette } from './darkPalette';
export { default as lightPalette } from './lightPalette';

declare module '@mui/material' {
  interface Color {
    0: string;
    50: string;
    100: string;
    150: string;
    200: string;
    250: string;
    300: string;
    350: string;
    400: string;
    450: string;
    500: string;
    550: string;
    600: string;
    650: string;
    700: string;
    750: string;
    800: string;
    850: string;
    900: string;
    950: string;
  }
}

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    emphasis?: string;
  }

  interface Color {
    50: string;
    100: string;
    150: string;
    200: string;
    250: string;
    300: string;
    350: string;
    400: string;
    450: string;
    500: string;
    550: string;
    600: string;
    650: string;
    700: string;
    750: string;
    800: string;
    850: string;
    900: string;
    950: string;
  }

  type ColorPartial = Partial<Color>;

  type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

  interface PaletteOptions {
    blue: ColorPartial;
    cyan: ColorPartial;
    red: ColorPartial;
    green: ColorPartial;
    orange: ColorPartial;
    yellow: ColorPartial;
    pink: ColorPartial;
    purple: ColorPartial;
    indigo: ColorPartial;
    border: {
      color: string;
      card: string;
    };
    colors: {
      foreground: string;
      shadow: string;
      'inline-code': string;
    };
    callout: {
      note: string;
      noteChannel: string;
      info: string;
      infoChannel: string;
      tip: string;
      tipChannel: string;
      warning: string;
      warningChannel: string;
    };
    tokens: {
      comment: string;
      selector: string;
      symbol: string;
      operator: string;
      keyword: string;
      function: string;
      punctuation: string;
    };
  }

  interface PaletteColor {
    emphasis?: string;
  }

  interface Palette extends PaletteOptions {}

  interface TypeBackground {
    defaultChannel: string;
    header: string;
    'code-block': string;
    'highlight-code-line': string;
    'inserted-code-line': string;
    'deleted-code-line': string;
    callout: string;
    'toc-process-bar': string;
    'scroll-button': string;
    'scroll-button-hover': string;
  }
}
