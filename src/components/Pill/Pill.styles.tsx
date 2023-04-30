import { Box, BoxProps, styled } from '@mui/material';

export type PillVariant = 'success' | 'error' | 'warning';

export const StyledPill = styled(Box, {
  shouldForwardProp: prop => prop !== 'variant'
})<BoxProps & { variant?: PillVariant }>(({ theme, variant }) => ({
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 500,
  userSelect: 'none',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.vars.shape['borderRadius-sm'],
  color: theme.vars.palette[variant || 'primary'].main,
  backgroundColor: theme.vars.palette[variant || 'primary'].emphasis
}));
