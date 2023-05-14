import { Card, styled } from '@mui/material';

export const StyledMDXLinkPreview = styled(Card)(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'background.default',
  borderColor: theme.vars.palette.border.color,
  boxShadow: `0.5px 1px 1px ${theme.vars.palette.colors.shadow}}`,
  '&:hover': {
    borderColor: theme.vars.palette.border.card
  }
})) as typeof Card;
