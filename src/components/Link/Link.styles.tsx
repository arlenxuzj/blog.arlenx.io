import { Link, LinkProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLink = styled(Link)<LinkProps>(() => ({
  textUnderlineOffset: '6px',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease, color 0.3s ease',
  '&.arrow': {
    '&.arrow-left': {
      '&:before': {
        content: '""',
        display: 'inline-block',
        verticalAlign: 'middle',
        maskImage:
          'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSJ2YXIoLS1zaXplLCAxLjA1ZW0pIiBoZWlnaHQ9InZhcigtLXNpemUsIDEuMDVlbSkiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeTE9IjEyIiB4Mj0iMTkiIHkyPSIxMiI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9IjEyIDUgMTkgMTIgMTIgMTkiPjwvcG9seWxpbmU+PC9zdmc+)',
        maskRepeat: 'no-repeat',
        width: '1.05rem',
        height: '1.05rem',
        marginTop: '-2px',
        marginRight: '0.18em',
        backgroundColor: 'currentColor',
        transition: 'transform 0.4s ease',
        transform: 'translateX(0) scaleX(-1)'
      }
    },
    '&.arrow-right': {
      '&:after': {
        content: '""',
        display: 'inline-block',
        verticalAlign: 'middle',
        maskImage:
          'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSJ2YXIoLS1zaXplLCAxLjA1ZW0pIiBoZWlnaHQ9InZhcigtLXNpemUsIDEuMDVlbSkiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeTE9IjEyIiB4Mj0iMTkiIHkyPSIxMiI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9IjEyIDUgMTkgMTIgMTIgMTkiPjwvcG9seWxpbmU+PC9zdmc+)',
        maskRepeat: 'no-repeat',
        width: '1rem',
        height: '1rem',
        marginTop: '-2px',
        marginLeft: '0.18em',
        backgroundColor: 'currentColor',
        transition: 'transform 0.4s ease',
        transform: 'translateX(0) scaleX(1)'
      }
    }
  },
  '&:hover': {
    '&.arrow': {
      '&.arrow-left': {
        '&:before': {
          transform: 'translateX(-0.25em) scaleX(-1)'
        }
      },
      '&.arrow-right': {
        '&:after': {
          transform: 'translateX(0.25em) scaleX(1)'
        }
      }
    }
  }
})) as typeof Link;
