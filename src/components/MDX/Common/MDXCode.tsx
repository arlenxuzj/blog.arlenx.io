import { styled } from '@mui/material/styles';

import { StyledInlineCode } from '../../Code/InlineCode.styles';

export const StyledMDXCode = styled('code')(() => ({
  fontFamily: '"Fira Code", monospace'
}));

export type MDXCodeProps = {
  className?: string;
  children?: React.ReactNode;
};

const MDXCode = (props: MDXCodeProps) => {
  const { className, children } = props;

  if (!children) {
    return null;
  }

  // if no language is specified, render inline code
  if (!className || !className.includes('language-')) {
    return (
      <StyledInlineCode component='code' family='mono' className={className}>
        {children}
      </StyledInlineCode>
    );
  }

  return <StyledMDXCode className={className}>{children}</StyledMDXCode>;
};

export default MDXCode;
