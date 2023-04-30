import { Text } from '../../Typography';

export type MDXHeadingProps = {
  children?: React.ReactNode;
};

export const MDXHeading1 = ({ children, ...rest }: MDXHeadingProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='h1'
      fontWeight={800}
      size='5xl'
      sx={{ mt: 8, mb: 4 }}
      {...rest}
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
      fontWeight={700}
      fontSize={30}
      sx={{ mt: 7, mb: 4 }}
      {...rest}
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
      fontWeight={600}
      size='2xl'
      sx={{ mt: 6, mb: 3 }}
      {...rest}
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
      fontWeight={500}
      size='xl'
      sx={{ mt: 5, mb: 3 }}
      {...rest}
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
      fontWeight={500}
      size='lg'
      sx={{ mt: 4, mb: 2 }}
      {...rest}
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
      fontWeight={500}
      size='lg'
      sx={{ mt: 3, mb: 2, color: 'text.secondary' }}
      {...rest}
    >
      {children}
    </Text>
  );
};
