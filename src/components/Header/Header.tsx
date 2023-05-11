import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useWindowScroll } from 'react-use';

import { NAV_HEIGHT } from '@/constants';

import { BurgerMenu, ModeSwitcher } from '../Button';
import { InternalLink } from '../Link';
import Logo from '../Logo';
import { MobileNavbar, Navbar } from '../Navbar';
import { StyledTooltip } from '../Tooltip/Tooltip.styles';
import { ContentWrapper } from '../Wrapper';
import { StyledHeader } from './Header.styles';
import HeaderProgressBar from './HeaderProgressBar';

const headerVariants = {
  open: {
    height: NAV_HEIGHT * 2, // 128
    transition: { ease: 'easeInOut', duration: 0.3 }
  },
  collapsed: {
    height: NAV_HEIGHT, // 64
    transition: { ease: 'easeInOut', duration: 0.3, delayChildren: 0.5 }
  }
};

export type HeaderProps = {
  showProgressBar?: boolean;
};

const Header = ({ showProgressBar }: HeaderProps) => {
  const offsetHeight = NAV_HEIGHT * 3; // 192
  const logoSize = NAV_HEIGHT / 2; // 32
  const router = useRouter();
  const { y } = useWindowScroll();
  const reachedOffset = y > offsetHeight / 3;

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [y]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    router.push(event.currentTarget.href);
  };
  return (
    <>
      <StyledHeader
        id='header'
        component={motion.header}
        initial='open'
        animate={reachedOffset ? 'collapsed' : 'open'}
        variants={headerVariants}
        sx={theme => ({
          zIndex: `calc(${theme.vars.zIndex.appBar} + 1)`,
          borderColor: {
            xs: 'transparent',
            md: reachedOffset ? theme.vars.palette.border.color : 'transparent'
          }
        })}
      >
        <ContentWrapper>
          <Stack gridColumn={2} alignItems='center' direction='row'>
            <Stack direction='row' alignItems='center' gap={2} flexGrow={1}>
              <InternalLink
                href='/'
                sx={{ height: logoSize }}
                onClick={handleClick}
              >
                <Logo width={logoSize} height={logoSize} />
              </InternalLink>
            </Stack>
            <Stack direction='row' alignItems='center' gap={2}>
              <Navbar />
              <StyledTooltip title='Activate light mode'>
                <ModeSwitcher />
              </StyledTooltip>
              <BurgerMenu
                open={menuOpen}
                toggleOpen={() => {
                  setMenuOpen(!menuOpen);
                }}
              />
            </Stack>
          </Stack>
        </ContentWrapper>
        {showProgressBar && <HeaderProgressBar />}
      </StyledHeader>
      <MobileNavbar open={menuOpen} setOpen={setMenuOpen} />
      <Box
        id='back-to-top-anchor'
        sx={{
          height: { xs: offsetHeight / 2, md: offsetHeight }
        }}
      />
    </>
  );
};

export default Header;
