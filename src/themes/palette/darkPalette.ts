import { ColorSystemOptions, PaletteOptions, alpha } from '@mui/material';
import { colorChannel } from '@mui/system';

import {
  blue,
  cyan,
  green,
  grey,
  indigo,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from '../colors';

const darkPalette: PaletteOptions = {
  primary: {
    main: blue[350],
    light: blue[250],
    dark: blue[450],
    contrastText: indigo[900],
    emphasis: alpha(blue[350], 0.1)
  },
  success: {
    main: green[450],
    light: green[250],
    dark: green[650],
    contrastText: indigo[900],
    emphasis: alpha(green[450], 0.1)
  },
  warning: {
    main: orange[450],
    light: orange[250],
    dark: orange[650],
    contrastText: indigo[900],
    emphasis: alpha(orange[450], 0.1)
  },
  error: {
    main: red[300],
    light: red[200],
    dark: red[400],
    contrastText: indigo[900],
    emphasis: alpha(red[400], 0.1)
  },
  text: {
    primary: indigo[50],
    secondary: grey[200],
    disabled: grey[350]
  },
  background: {
    default: grey[900],
    defaultChannel: colorChannel(grey[900]),
    paper: grey[800],
    header: alpha(grey[900], 0.4),
    'code-block': alpha(grey[850], 0.5),
    'highlight-code-line': alpha(blue[350], 0.2),
    'inserted-code-line': alpha(green[450], 0.2),
    'deleted-code-line': alpha(red[400], 0.2),
    callout: alpha(grey[850], 0.5),
    'toc-process-bar': alpha(grey[200], 0.3),
    'scroll-button': grey[750],
    'scroll-button-hover': grey[650]
  },
  grey: grey,
  blue: blue,
  cyan: cyan,
  red: red,
  green: green,
  orange: orange,
  yellow: yellow,
  pink: pink,
  purple: purple,
  indigo: indigo,
  border: {
    color: grey[800],
    card: grey[700]
  },
  divider: grey[800],
  colors: {
    foreground: alpha(grey[800], 0.6),
    shadow: 'hsl(223deg 5% 1% / 0.333)',
    'inline-code': blue[300]
  },
  callout: {
    note: blue[350],
    noteChannel: colorChannel(blue[350]),
    info: cyan[550],
    infoChannel: colorChannel(cyan[300]),
    tip: teal[450],
    tipChannel: colorChannel(teal[450]),
    warning: orange[450],
    warningChannel: colorChannel(orange[450])
  },
  tokens: {
    comment: grey[400],
    selector: indigo[200],
    symbol: blue[350],
    operator: yellow[350],
    keyword: pink[350],
    function: blue[300],
    punctuation: indigo[200]
  }
};

export const darkCssVarsPalette: ColorSystemOptions['palette'] = {
  ...darkPalette,
  TableCell: {
    border: grey[800]
  }
};

export default darkPalette;
