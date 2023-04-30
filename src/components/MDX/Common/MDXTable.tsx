import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

export type MDXTableProps = {
  children?: React.ReactNode;
};

export const MDXTable = ({ children, ...rest }: MDXTableProps) => {
  if (!children) {
    return null;
  }

  return (
    <Table {...rest} sx={{ mt: 2, mb: 5 }}>
      {children}
    </Table>
  );
};

export const MDXTableHead = ({ children, ...rest }: MDXTableProps) => {
  if (!children) {
    return null;
  }

  return (
    <TableHead {...rest} sx={{}}>
      {children}
    </TableHead>
  );
};

export const MDXTableBody = ({ children, ...rest }: MDXTableProps) => {
  if (!children) {
    return null;
  }

  return <TableBody {...rest}>{children}</TableBody>;
};

export const MDXTableRow = ({ children, ...rest }: MDXTableProps) => {
  if (!children) {
    return null;
  }

  return <TableRow {...rest}>{children}</TableRow>;
};

export const MDXTableCell = ({ children, ...rest }: MDXTableProps) => {
  return (
    <TableCell
      {...rest}
      sx={theme => ({
        fontSize: '16px',
        '&.MuiTableCell-root': {
          '&:first-of-type': {
            pl: 0
          }
        },
        '&.MuiTableCell-head': {
          borderColor: theme.vars.palette.text.primary,
          p: 1.5,
          pt: 0,
          fontWeight: 600
        },
        '&.MuiTableCell-body': {
          color: theme.vars.palette.text.secondary,
          p: 1.5
        }
      })}
    >
      {children}
    </TableCell>
  );
};
