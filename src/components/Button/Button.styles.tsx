import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Box)<BoxProps>(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  padding: theme.spacing(1),
  borderRadius: theme.vars.shape['borderRadius-sm'],
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 500,
  '&:hover': {
    color: theme.vars.palette.primary.main,
    backgroundColor: `hsla(
      ${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity}
    )`
  }
})) as typeof Box;
