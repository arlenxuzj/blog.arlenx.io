import { Box, Divider, Stack } from '@mui/material';

import navLinks from '@/configs/navLinks';
import siteMeta from '@/configs/siteMeta';
import analytics from '@/utils/analytics';

import { DevSvgIcon } from '../Icon';
import { ExternalLink, InternalLink } from '../Link';
import Logo from '../Logo';
import { Text } from '../Typography';
import { ContentWrapper } from '../Wrapper';
import { StyledFooter } from './Footer.styles';

const Footer = () => {
  return (
    <StyledFooter>
      <Divider />
      <ContentWrapper>
        <Stack
          gridColumn={2}
          sx={{
            pt: 8,
            pb: 10
          }}
        >
          <Stack
            alignItems='flex-start'
            justifyContent='space-between'
            gap={4}
            sx={{
              flexDirection: {
                xs: 'column',
                lg: 'row'
              }
            }}
          >
            <Stack
              gap={2.5}
              alignItems='flex-start'
              sx={{
                minWidth: 360
              }}
            >
              <Stack
                direction='row'
                alignItems='center'
                component={InternalLink}
                color='text.primary'
                underline='none'
                href='/'
                sx={{
                  textDecoration: 'none'
                }}
              >
                <Logo width={20} height={20} />
                <Text
                  fontWeight={500}
                  sx={{
                    ml: 1.5
                  }}
                >
                  {siteMeta.title}
                </Text>
              </Stack>
              <Stack color='text.disabled' gap={1.5}>
                <Stack
                  direction='row'
                  alignItems='center'
                  gap={1}
                  flexWrap='wrap'
                >
                  <Text size='xs' fontWeight={500}>
                    Build with
                  </Text>
                  <Stack
                    direction='row'
                    alignItems='center'
                    gap={1}
                    color='text.primary'
                    sx={{
                      lineHeight: 0
                    }}
                  >
                    <ExternalLink href='https://nextjs.org' color='inherit'>
                      <DevSvgIcon name='NextJs' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink href='https://reactjs.org' color='inherit'>
                      <DevSvgIcon name='React' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink href='https://mui.com' color='inherit'>
                      <DevSvgIcon name='Mui' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink href='https://www.prisma.io' color='inherit'>
                      <DevSvgIcon name='Prisma' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://www.typescriptlang.org'
                      color='inherit'
                    >
                      <DevSvgIcon name='TypeScript' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink href='https://vercel.com' color='inherit'>
                      <DevSvgIcon name='Vercel' fontSize='small' />
                    </ExternalLink>
                  </Stack>
                  <Text size='xs' fontWeight={500}>
                    -
                  </Text>
                  <Text
                    size='xs'
                    color='text.disabled'
                    component={ExternalLink}
                    underline='none'
                    href={siteMeta.repo}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'text.disabled',
                      '&:hover': {
                        color: 'text.primary',
                        borderColor: 'text.primary'
                      }
                    }}
                  >
                    <span
                      onClick={() => {
                        analytics.trackEvent('footer-view-source');
                      }}
                    >
                      View Source
                    </span>
                  </Text>
                </Stack>
                <Text
                  size='xs'
                  fontWeight={500}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <span>{`Copyright © ${new Date().getFullYear()}`}</span>
                  <span>{` • `}</span>
                  <span>{siteMeta.fullName}</span>
                </Text>
              </Stack>
            </Stack>
            <Stack
              rowGap={4}
              columnGap={8}
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                }
              }}
            >
              <Box>
                <Text size='xs' fontWeight={500}>
                  Sitemap
                </Text>
                <Box
                  sx={{
                    mt: 2,
                    display: {
                      xs: 'flex',
                      md: 'grid'
                    },
                    flexDirection: 'column',
                    gridTemplateRows: 'repeat(4, 1fr)',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridAutoFlow: 'column',
                    rowGap: 1,
                    columnGap: 8
                  }}
                >
                  {navLinks.map(nav => (
                    <Text
                      key={nav.label}
                      component={InternalLink}
                      href={nav.href}
                      size='xs'
                      underline='none'
                      color='text.secondary'
                      fontWeight={500}
                      sx={{
                        '&:hover': {
                          color: 'text.primary'
                        }
                      }}
                    >
                      {nav.label}
                    </Text>
                  ))}
                </Box>
              </Box>
              <Box>
                <Text size='xs' fontWeight={500}>
                  Design
                </Text>
                <Stack
                  gap={1}
                  sx={{
                    mt: 2
                  }}
                >
                  {/* <Text
                    component={ExternalLink}
                    noReferrer={false}
                    href='https://design.arlenx.io'
                    size='xs'
                    underline='none'
                    color='text.secondary'
                    fontWeight={500}
                    sx={{
                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    UI
                  </Text> */}
                  <Text
                    component={InternalLink}
                    href='/mdx-components'
                    size='xs'
                    underline='none'
                    color='text.secondary'
                    fontWeight={500}
                    sx={{
                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    MDX
                  </Text>
                </Stack>
              </Box>
              <Box>
                <Text size='xs' fontWeight={500}>
                  Find Me
                </Text>
                <Stack
                  gap={1}
                  sx={{
                    mt: 2
                  }}
                >
                  <Text
                    component={ExternalLink}
                    href={`mailto:${siteMeta.findMe.email}`}
                    size='xs'
                    underline='none'
                    color='text.secondary'
                    fontWeight={500}
                    sx={{
                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    component={ExternalLink}
                    href={siteMeta.findMe.github}
                    size='xs'
                    underline='none'
                    color='text.secondary'
                    fontWeight={500}
                    sx={{
                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    Github
                  </Text>
                  <Text
                    component={ExternalLink}
                    href={siteMeta.findMe.linkedin}
                    size='xs'
                    underline='none'
                    color='text.secondary'
                    fontWeight={500}
                    sx={{
                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    Linkedin
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </ContentWrapper>
    </StyledFooter>
  );
};

export default Footer;
