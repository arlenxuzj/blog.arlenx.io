import { styled } from '@mui/material';

export const StyledMDXBlockquote = styled('blockquote')(({ theme }) => ({
  borderLeft: `2px solid ${theme.vars.palette.primary.main}`,
  margin: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  '& blockquote': {
    marginBottom: theme.spacing(2)
  },
  '& > p:first-child': {
    marginTop: 0
  },
  '& > :last-child': {
    marginBottom: 0
  },
  '& p': {
    margin: theme.spacing(2, 0)
  }
}));
