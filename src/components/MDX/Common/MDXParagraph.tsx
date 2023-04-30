import { SxProps, Theme } from '@mui/material/styles';

import { Text } from '../../Typography';

export type MDXParagraphProps = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const MDXParagraph = ({ children, sx, ...rest }: MDXParagraphProps) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      component='p'
      size='md'
      {...rest}
      sx={[{ my: 3, lineHeight: 1.8 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Text>
  );
};

export default MDXParagraph;
