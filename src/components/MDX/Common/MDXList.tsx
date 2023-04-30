import {
  StyledMDXListItem,
  StyledMDXOrderedList,
  StyledMDXUnorderedList
} from './MDXList.styles';

export type MDXListProps = {
  children?: React.ReactNode;
};

export const MDXUnorderedList = ({ children }: MDXListProps) => {
  if (!children) {
    return null;
  }

  return <StyledMDXUnorderedList>{children}</StyledMDXUnorderedList>;
};

export const MDXOrderedList = ({ children, ...rest }: MDXListProps) => {
  if (!children) {
    return null;
  }

  return <StyledMDXOrderedList {...rest}>{children}</StyledMDXOrderedList>;
};

export const MDXListItem = ({ children }: MDXListProps) => {
  if (!children) {
    return null;
  }

  return <StyledMDXListItem>{children}</StyledMDXListItem>;
};
