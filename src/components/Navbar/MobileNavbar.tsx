import { Dispatch, SetStateAction } from 'react';

import { useRouter } from 'next/router';

import { Box, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { slug } from 'github-slugger';

import navLinks from '@/configs/navLinks';
import { umamiEventClass } from '@/utils/umami';

import { ButtonLink } from '../Link';

export type MobileNavbarProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

const MobileNavbar = ({ open, setOpen }: MobileNavbarProps) => {
  const router = useRouter();
  const navBarVariants = {
    open: {
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    closed: {
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    router.push(event.currentTarget.href);
  };

  return (
    <Stack
      component={motion.div}
      initial={false}
      animate={open ? 'open' : 'closed'}
      variants={navBarVariants}
      sx={theme => ({
        display: {
          xs: 'flex !important',
          md: 'none !important'
        },
        position: 'fixed',
        width: '100%',
        px: 1.5,
        top: 64,
        overflowY: 'hidden',
        backgroundColor: theme.vars.palette.background.default,
        zIndex: theme.vars.zIndex.appBar,
        borderBottom: '1px solid',
        borderColor: theme.vars.palette.border.color
      })}
    >
      <AnimatePresence>
        {open && (
          <>
            {navLinks
              .filter(n => n.href !== '/')
              .map((nav, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.1,
                      duration: 0.3 + index * 0.1
                    }
                  }}
                  exit={{
                    x: 0,
                    opacity: 1
                  }}
                >
                  <ButtonLink href={nav.href} onClick={handleClick}>
                    <span
                      className={umamiEventClass(
                        `nav-mobile-${slug(nav.label)}`
                      )}
                    >
                      {nav.label}
                    </span>
                  </ButtonLink>
                </Box>
              ))}
          </>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default MobileNavbar;
