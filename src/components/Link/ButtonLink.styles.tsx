import { Box, Link, LinkProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonLink = styled(Link)<LinkProps>(({ theme }) => ({
  display: 'inline-block',
  color: theme.vars.palette.text.primary,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.vars.shape['borderRadius-sm'],
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '18px',
  '&:hover': {
    [theme.breakpoints.up('md')]: {
      color: theme.vars.palette.primary.main,
      backgroundColor: theme.vars.palette.primary.emphasis
    }
  }
})) as typeof Box;
