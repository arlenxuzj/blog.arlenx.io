import React from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab } from '@mui/material';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 512
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  return (
    <Slide direction='up' in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32
        }}
      >
        <Fab
          size='small'
          disableRipple
          sx={theme => ({
            backgroundColor: theme.vars.palette.background['scroll-button'],
            color: theme.vars.palette.grey[50],
            '&:hover': {
              backgroundColor:
                theme.vars.palette.background['scroll-button-hover']
            }
          })}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Slide>
  );
};

export default ScrollToTop;
