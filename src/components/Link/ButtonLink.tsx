import { default as NextLink } from 'next/link';

import { LinkProps } from '@mui/material';

import { StyledButtonLink } from './ButtonLink.styles';

export type ButtonLinkProps = {
  href: string;
} & LinkProps;

const ButtonLink = ({ children, href, ...rest }: ButtonLinkProps) => {
  return (
    <StyledButtonLink component={NextLink} href={href} {...rest}>
      {children}
    </StyledButtonLink>
  );
};

export default ButtonLink;
