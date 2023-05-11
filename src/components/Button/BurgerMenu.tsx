/*
Copy and modify from
https://github.com/imzxj/next-blog-starter/blob/main/src/components/BurgerMenu.tsx
 */
import { motion } from 'framer-motion';

import umami from '@/utils/umami';

import { StyledButton } from './Button.styles';

export type BurgerMenuProps = {
  open: boolean;
  toggleOpen: () => void;
};

const BurgerMenu = ({ open, toggleOpen }: BurgerMenuProps) => {
  const duration = 0.3;

  const firstRectVariants = {
    open: {
      x: 2,
      y: 13,
      rotate: -45
    },
    closed: {
      x: 2,
      y: 4,
      rotate: 0
    }
  };

  const secondRectVariants = {
    open: {
      x: 2,
      y: 13,
      rotate: 45
    },
    closed: {
      x: 2,
      y: 12.5,
      rotate: 0
    }
  };

  const thirdRectVariants = {
    open: {
      x: 2,
      y: 13,
      rotate: -45
    },
    closed: {
      x: 2,
      y: 21,
      rotate: 0
    }
  };

  return (
    <StyledButton
      component={motion.div}
      initial='closed'
      animate={open ? 'open' : 'closed'}
      transition={{ duration }}
      onClick={() => {
        umami.trackEvent('nav-mobile-toggle');
        toggleOpen();
      }}
      sx={{
        maxHeight: 38,
        display: {
          xs: 'block',
          md: 'none'
        }
      }}
    >
      <motion.svg
        width='24'
        height='24'
        viewBox='0 0 27 27'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.rect
          width='23'
          height='2'
          rx='1'
          fill='currentColor'
          variants={firstRectVariants}
          transition={{ duration }}
          style={{ originX: '11.5px', originY: '1px' }}
        />
        <motion.rect
          width='23'
          height='2'
          rx='1'
          fill='currentColor'
          variants={secondRectVariants}
          transition={{ duration }}
          style={{ originX: '11.5px', originY: '1px' }}
        />
        <motion.rect
          width='23'
          height='2'
          rx='1'
          fill='currentColor'
          variants={thirdRectVariants}
          transition={{ duration }}
          style={{ originX: '11.5px', originY: '1px' }}
        />
      </motion.svg>
    </StyledButton>
  );
};

export default BurgerMenu;
