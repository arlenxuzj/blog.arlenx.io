import { Box } from '@mui/material';

import useProgress from '@/hooks/useProgress';

const HeaderProgressBar = () => {
  const readingProgress = useProgress();

  return (
    <Box
      sx={theme => ({
        display: { xs: 'block', md: 'none' },
        width: '100%',
        background: 'transparent',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          height: 2,
          top: -0.5,
          left: 0,
          background: theme.vars.palette.text.secondary,
          width: `${readingProgress * 100}%`,
          transition: 'width 0.5s',
          willChange: 'width'
        }
      })}
    />
  );
};

export default HeaderProgressBar;
