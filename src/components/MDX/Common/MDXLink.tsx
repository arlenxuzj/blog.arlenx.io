import { useState } from 'react';

import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import { copyToClipboard } from '@/utils/browser';

import { ExternalLink, InternalLink } from '../../Link';
import { StyledTooltip } from '../../Tooltip/Tooltip.styles';

export type MDXLinkProps = {
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

const MDXLink = (props: MDXLinkProps) => {
  const { href, children, className, ...rest } = props;
  const [tooltipText, setTooltipText] = useState('Copy link');

  if (!children) {
    return null;
  }

  const handleHashLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setTooltipText('Copied!');
    copyToClipboard(
      `${window.location.origin}${window.location.pathname}${href}`
    );
  };

  const handleHashLinkMouseEnter = () => {
    setTooltipText('Copy link');
  };

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    if (href.startsWith('#') && className?.includes('heading-anchor')) {
      return (
        <InternalLink
          className={className}
          href={href}
          {...rest}
          underline='none'
          sx={{
            fontSize: 'inherit',
            position: 'absolute',
            width: '80%',
            maxWidth: DEFAULT_CONTENT_WIDTH * 0.8,
            marginLeft: { xs: '-0.8em', md: '-1em' },
            '& .icon-link': {
              visibility: 'hidden',
              '&:hover': {
                visibility: 'visible'
              },
              '&:after': {
                content: '"#"'
              }
            },
            '&:hover .icon-link': {
              visibility: 'visible'
            }
          }}
          onClick={handleHashLinkClick}
          onMouseEnter={handleHashLinkMouseEnter}
        >
          <StyledTooltip title={tooltipText}>
            <span>{children}</span>
          </StyledTooltip>
        </InternalLink>
      );
    }

    return (
      <InternalLink
        className={className}
        href={href}
        underline='none'
        sx={{
          fontSize: 'inherit',
          borderBottom: '2px solid',
          borderColor: 'transparent',
          '&:hover': {
            borderColor: 'primary.main'
          }
        }}
      >
        {children}
      </InternalLink>
    );
  }

  // External link with attributes
  // ::referrer ::noreferrer ::follow ::nofollow
  let noReferrer = true;
  let noFollow = false;

  const externalLinkWithAttributes = (children as string).split('::');

  if (externalLinkWithAttributes.includes('referrer')) {
    noReferrer = false;
  }

  if (externalLinkWithAttributes.includes('nofollow')) {
    noFollow = true;
  }

  if (externalLinkWithAttributes.includes('follow')) {
    noFollow = false;
  }

  return (
    <ExternalLink
      className={className}
      href={href}
      underline='none'
      noReferrer={noReferrer}
      noFollow={noFollow}
      sx={{
        fontSize: 'inherit',
        borderBottom: '2px solid',
        borderColor: 'transparent',
        '&:hover': {
          borderColor: 'primary.main'
        }
      }}
    >
      {externalLinkWithAttributes[0].trim()}
    </ExternalLink>
  );
};

export default MDXLink;
