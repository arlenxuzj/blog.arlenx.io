import { Stack } from '@mui/material';

import navLinks from '@/configs/navLinks';

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
            {nav.label}
          </ButtonLink>
        ))}
    </Stack>
  );
};

export default Navbar;
