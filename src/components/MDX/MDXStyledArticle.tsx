import { styled } from '@mui/material';

import { CONTENT_WRAPPER_COLUMN_GAP_UNIT, SCROLL_OFFSET } from '@/constants';

const MDXStyledArticle = styled('article')(({ theme }) => ({
  width: '100%',
  color: theme.vars.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    width: `calc(100vw - ${CONTENT_WRAPPER_COLUMN_GAP_UNIT * 8 * 2}px)`
  },
  '& > section:first-of-type': {
    '& :first-child': {
      marginTop: 0
    }
  },
  '& section': {
    '& :last-child': {
      marginBottom: 0
    }
  },
  '& h1,h2,h3,h4,h5,h6': {
    color: theme.vars.palette.text.primary,
    scrollMarginTop: SCROLL_OFFSET,
    '& strong': {
      color: theme.vars.palette.text.primary,
      fontWeight: 800
    },
    '& i:first-of-type': {
      paddingLeft: 0,
      marginLeft: 0
    },
    '& + *': {
      marginTop: 0
    }
  },
  '& strong': {
    color: theme.vars.palette.text.primary,
    fontWeight: 600
  },
  ' & em': {
    color: theme.vars.palette.text.primary
  }
}));

export default MDXStyledArticle;
