import { StyledMDXBlockquote } from './MDXBlockquote.styles';

export type MDXBlockquoteProps = {
  children?: React.ReactNode;
};

const MDXBlockquote = ({ children }: MDXBlockquoteProps) => {
  return <StyledMDXBlockquote>{children}</StyledMDXBlockquote>;
};

export default MDXBlockquote;
