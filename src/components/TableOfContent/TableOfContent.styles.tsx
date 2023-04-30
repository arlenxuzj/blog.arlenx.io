import { Box, BoxProps, styled } from '@mui/material';

import { NAV_HEIGHT } from '@/constants';

export const TocWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'sticky',
  display: 'flex',
  maxWidth: 250,
  height: '60vh',
  maxHeight: 500,
  top: NAV_HEIGHT * 3,
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('lg')]: {
    marginLeft: theme.spacing(1.5)
  }
}));

export const StyledTocList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(3),
  [theme.breakpoints.down('xl')]: {
    display: 'none'
  },
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

export const StyledTocListItem = styled('li', {
  shouldForwardProp: prop => prop !== 'level'
})<{
  level: number;
}>(({ theme, level }) => ({
  padding: 0,
  margin: theme.spacing(1.4, 0),
  marginLeft: theme.spacing(1.5 * (level - 2))
}));
