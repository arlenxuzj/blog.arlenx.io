import { LinkProps } from '@mui/material';

import { InternalLink } from '../Link';

export type TagProps = {
  label: string;
} & LinkProps;

const Tag = ({ label, sx, ...rest }: TagProps) => {
  return (
    <InternalLink
      href={`/tags/${label}`}
      underline='none'
      {...rest}
      sx={[
        theme => ({
          fontSize: 16,
          borderBottom: '1px solid',
          borderColor: 'transparent',
          color: theme.vars.palette.primary.main,
          '&:hover': {
            borderColor: theme.vars.palette.primary.main
          }
        }),
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >{`#${label}`}</InternalLink>
  );
};

export default Tag;
