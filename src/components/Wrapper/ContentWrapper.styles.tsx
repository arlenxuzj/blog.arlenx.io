import { Box, BoxProps, styled } from '@mui/material';

import { CONTENT_WRAPPER_COLUMN_GAP_UNIT } from '@/constants';

export const StyledContentWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'contentWidth'
})<BoxProps & { contentWidth: number }>(({ theme, contentWidth }) => ({
  display: 'grid',
  height: 'inherit',
  columnGap: theme.spacing(CONTENT_WRAPPER_COLUMN_GAP_UNIT),
  gridTemplateColumns: `1fr minmax(auto, ${contentWidth}px) 1fr`,
  [theme.breakpoints.down('2xl')]: {
    gridTemplateColumns: `1fr minmax(auto, 700px) 1fr`
  }
}));
