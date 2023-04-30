import { Box, BoxProps, styled } from '@mui/material';

export const StyledHeader = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: theme.vars.zIndex.appBar,
  background: theme.vars.palette.background.header,
  backdropFilter: 'blur(8px)',
  transition: 'background-color 0.5s, border-color 0.5s',
  borderBottom: '1px solid',
  [theme.breakpoints.down('md')]: {
    height: '64px !important'
  }
})) as typeof Box;
