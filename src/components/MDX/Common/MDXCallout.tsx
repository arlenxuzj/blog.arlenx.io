import { StyledMDXCallout } from './MDXCallout.styles';

export type MDXCalloutProps = {
  children?: React.ReactNode;
  className?: string;
};

const MDXCallout = (props: MDXCalloutProps) => {
  const { children, className } = props;

  // console.log(props);

  return <StyledMDXCallout className={className}>{children}</StyledMDXCallout>;
};

export default MDXCallout;
