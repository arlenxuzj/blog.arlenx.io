import { styled } from '@mui/material';

export const StyledMDXUnorderedList = styled('ul')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  fontSize: '18px'
}));

export const StyledMDXOrderedList = styled('ol')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  fontSize: '18px'
}));

export const StyledMDXListItem = styled('li')(({ theme }) => ({
  lineHeight: 1.8,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1.5)
  }
}));
