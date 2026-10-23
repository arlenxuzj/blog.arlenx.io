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
          sx={{
            gridColumn: 2,
            pt: 8,
            pb: 10
          }}
        >
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 4,

              flexDirection: {
                xs: 'column',
                lg: 'row'
              }
            }}
          >
            <Stack
              sx={{
                gap: 2.5,
                alignItems: 'flex-start',
                minWidth: 360
              }}
            >
              <Stack
                direction='row'
                component={InternalLink}
                underline='none'
                href='/'
                sx={{
                  alignItems: 'center',
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                <Logo width={20} height={20} />
                <Text
                  sx={{
                    fontWeight: 500,
                    ml: 1.5
                  }}
                >
                  {siteMeta.title}
                </Text>
              </Stack>
              <Stack
                sx={{
                  color: 'text.disabled',
                  gap: 1.5
                }}
              >
                <Stack
                  direction='row'
                  sx={{
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap'
                  }}
                >
                  <Text
                    size='xs'
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    Build with
                  </Text>
                  <Stack
                    direction='row'
                    sx={{
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.primary',
                      lineHeight: 0
                    }}
                  >
                    <ExternalLink
                      href='https://nextjs.org'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='NextJs' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://reactjs.org'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='React' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://mui.com'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='Mui' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://www.prisma.io'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='Prisma' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://www.typescriptlang.org'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='TypeScript' fontSize='small' />
                    </ExternalLink>
                    <ExternalLink
                      href='https://vercel.com'
                      sx={{
                        color: 'inherit'
                      }}
                    >
                      <DevSvgIcon name='Vercel' fontSize='small' />
                    </ExternalLink>
                  </Stack>
                  <Text
                    size='xs'
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    -
                  </Text>
                  <Text
                    size='xs'
                    component={ExternalLink}
                    underline='none'
                    href={siteMeta.repo}
                    sx={{
                      color: 'text.disabled',
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
                  sx={{
                    fontWeight: 500,
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
              sx={{
                rowGap: 4,
                columnGap: 8,

                flexDirection: {
                  xs: 'column',
                  md: 'row'
                }
              }}
            >
              <Box>
                <Text
                  size='xs'
                  sx={{
                    fontWeight: 500
                  }}
                >
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
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,

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
                <Text
                  size='xs'
                  sx={{
                    fontWeight: 500
                  }}
                >
                  Design
                </Text>
                <Stack
                  sx={{
                    gap: 1,
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
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,

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
                <Text
                  size='xs'
                  sx={{
                    fontWeight: 500
                  }}
                >
                  Find Me
                </Text>
                <Stack
                  sx={{
                    gap: 1,
                    mt: 2
                  }}
                >
                  <Text
                    component={ExternalLink}
                    href={`mailto:${siteMeta.findMe.email}`}
                    size='xs'
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,

                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    <span
                      onClick={() => {
                        analytics.trackEvent('footer-email');
                      }}
                    >
                      Email
                    </span>
                  </Text>
                  <Text
                    component={ExternalLink}
                    href={siteMeta.findMe.github}
                    size='xs'
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,

                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    <span
                      onClick={() => {
                        analytics.trackEvent('footer-github');
                      }}
                    >
                      Github
                    </span>
                  </Text>
                  <Text
                    component={ExternalLink}
                    href={siteMeta.findMe.linkedin}
                    size='xs'
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,

                      '&:hover': {
                        color: 'text.primary'
                      }
                    }}
                  >
                    <span
                      onClick={() => {
                        analytics.trackEvent('footer-linkedin');
                      }}
                    >
                      Linkedin
                    </span>
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
