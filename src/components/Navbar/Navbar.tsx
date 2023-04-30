import { Stack } from '@mui/material';
import { slug } from 'github-slugger';

import navLinks from '@/configs/navLinks';
import { umamiEventClass } from '@/utils/umami';

import { ButtonLink } from '../Link';

const Navbar = () => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={2}
      sx={{
        display: {
          xs: 'none',
          md: 'flex'
        }
      }}
    >
      {navLinks
        .filter(n => n.href !== '/')
        .map((nav, index) => (
          <ButtonLink
            key={index}
            href={nav.href}
            sx={{
              lineHeight: 1.2
            }}
          >
            <span className={umamiEventClass(`nav-${slug(nav.label)}`)}>
              {nav.label}
            </span>
          </ButtonLink>
        ))}
    </Stack>
  );
};

export default Navbar;
