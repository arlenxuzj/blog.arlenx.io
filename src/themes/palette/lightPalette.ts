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

const lightPalette: PaletteOptions = {
  primary: {
    main: blue[500],
    light: blue[400],
    dark: blue[600],
    contrastText: indigo[50],
    emphasis: alpha(blue[500], 0.05)
  },
  success: {
    main: green[550],
    light: green[450],
    dark: green[650],
    contrastText: indigo[50],
    emphasis: alpha(green[600], 0.15)
  },
  warning: {
    main: orange[550],
    light: orange[450],
    dark: orange[650],
    contrastText: indigo[50],
    emphasis: alpha(orange[550], 0.15)
  },
  error: {
    main: red[550],
    light: red[450],
    dark: red[650],
    contrastText: indigo[50],
    emphasis: alpha(red[150], 0.15)
  },
  text: {
    primary: indigo[900],
    secondary: grey[600],
    disabled: grey[450]
  },
  background: {
    default: '#f9fafb',
    defaultChannel: colorChannel('#f9fafb'),
    paper: grey[50],
    header: alpha('#f9fafb', 0.4),
    'code-block': alpha(grey[50], 0.1),
    'highlight-code-line': alpha(blue[500], 0.3),
    'inserted-code-line': alpha(green[700], 0.3),
    'deleted-code-line': alpha(red[150], 0.3),
    callout: alpha(grey[50], 0.5),
    'toc-process-bar': alpha(grey[300], 0.3),
    'scroll-button': grey[750],
    'scroll-button-hover': grey[850]
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
    color: alpha(blue[500], 0.05),
    snippet: grey[200]
  },
  divider: alpha(blue[500], 0.05),
  colors: {
    foreground: alpha(grey[50], 0.6),
    shadow: 'hsl(223deg 5% 80% / 0.333)',
    'inline-code': blue[500]
  },
  callout: {
    note: blue[500],
    noteChannel: colorChannel(blue[500]),
    info: cyan[650],
    infoChannel: colorChannel(cyan[650]),
    tip: teal[650],
    tipChannel: colorChannel(teal[650]),
    warning: orange[550],
    warningChannel: colorChannel(orange[550])
  },
  tokens: {
    comment: grey[350],
    selector: indigo[500],
    symbol: blue[600],
    operator: yellow[750],
    keyword: blue[500],
    function: pink[600],
    punctuation: indigo[600]
  }
};

export const lightCssVarsPalette: ColorSystemOptions['palette'] = {
  ...lightPalette,
  TableCell: {
    border: alpha(blue[500], 0.05)
  }
};

export default lightPalette;
