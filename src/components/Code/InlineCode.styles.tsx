import { styled } from '@mui/material/styles';

import { Typography } from '../Typography';

export const StyledInlineCode = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  padding: '2px 8px',
  wordBreak: 'break-word',
  border: '1px solid',
  borderColor: theme.vars.palette.border.color,
  borderRadius: 'calc(var(--shape-borderRadius) * 2)',
  backgroundColor: theme.vars.palette.colors.foreground,
  color: theme.vars.palette.colors['inline-code'],
  boxShadow: `0.5px 1px 1px ${theme.vars.palette.colors.shadow}}`
})) as typeof Typography;
