import type { SxProps, Theme } from '@mui/material/styles';
import { Text } from '../../Typography';

export type MDXHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  sx?: SxProps<Theme>;
};

export const MDXHeading1 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h1'
      size='5xl'
      {...rest}
      sx={[
        {
          fontWeight: 800,
          mt: 8,
          mb: 4
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};

export const MDXHeading2 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h2'
      {...rest}
      sx={[
        {
          fontWeight: 700,
          fontSize: 30,
          mt: 7,
          mb: 4
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};

export const MDXHeading3 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h3'
      size='2xl'
      {...rest}
      sx={[
        {
          fontWeight: 600,
          mt: 6,
          mb: 3
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};

export const MDXHeading4 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h4'
      size='xl'
      {...rest}
      sx={[
        {
          fontWeight: 500,
          mt: 5,
          mb: 3
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};

export const MDXHeading5 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h5'
      size='lg'
      {...rest}
      sx={[
        {
          fontWeight: 500,
          mt: 4,
          mb: 2
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};

export const MDXHeading6 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h6'
      size='lg'
      {...rest}
      sx={[
        {
          fontWeight: 500,
          mt: 3,
          mb: 2,
          color: 'text.secondary'
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])
      ]}
    >
      {children}
    </Text>
  );
};
