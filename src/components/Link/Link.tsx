import { default as NextLink } from 'next/link';

import { LinkProps } from '@mui/material';

import { StyledLink } from './Link.styles';

export type ExternalLinkProps = LinkProps & {
  noReferrer?: boolean;
  noFollow?: boolean;
};

export const ExternalLink = ({
  underline = 'hover',
  noReferrer = true,
  noFollow = false,
  children,
  ...rest
}: ExternalLinkProps) => {
  let rel = 'noopener';

  if (noReferrer) {
    rel += ' noreferrer';
  }

  if (noFollow) {
    rel += ' nofollow';
  }

  return (
    <StyledLink underline={underline} target='_blank' rel={rel} {...rest}>
      {children}
    </StyledLink>
  );
};

export const InternalLink = ({
  underline = 'hover',
  children,
  ...rest
}: LinkProps) => {
  return (
    <StyledLink
      component={NextLink}
      fontSize={18}
      fontWeight={500}
      underline={underline}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};
