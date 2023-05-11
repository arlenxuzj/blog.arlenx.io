import { Box, Stack } from '@mui/material';

import { TypedDescription, WavingHand } from '../Animation';
import { InlineCode } from '../Code';
import { InternalLink } from '../Link';
import { Text } from '../Typography';

const Description = () => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Text
          component='span'
          color='text.primary'
          fontWeight={800}
          sx={theme => ({
            fontSize: {
              xs: 36,
              md: 54
            },
            backgroundColor: theme.vars.palette.primary.main,
            backgroundSize: '100%',
            backgroundImage: `linear-gradient(to right, ${theme.vars.palette.primary.main}, ${theme.vars.palette.error.main});`,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          })}
        >
          {'Hello, folks! '}
        </Text>
        <Text
          component='span'
          sx={{
            fontSize: {
              xs: 36,
              md: 54
            }
          }}
        >
          <WavingHand />
        </Text>
      </Box>
      <Text
        component='h1'
        color='text.primary'
        size='md'
        fontWeight={500}
        sx={{
          lineHeight: '32px'
        }}
      >
        {"I'm "}
        <b>Zhen Jun Xu</b>
        {' - a full-stack developer in Vancouver, Canada '}
        <i className='twa twa-lg twa-flag-canada'></i>.
      </Text>
      <TypedDescription />
      <Text
        color='text.secondary'
        size='md'
        sx={{
          mt: 2,
          mb: 4,
          lineHeight: 1.8
        }}
      >
        {'I started my coding journey in 2015 with '}
        <InlineCode>Python</InlineCode> / <InlineCode>C</InlineCode> /{' '}
        <InlineCode>C++</InlineCode> in university.
        <br />
        {'I play in '}
        <InlineCode>.tsx?</InlineCode>, <InlineCode>.jsx?</InlineCode>,{' '}
        <InlineCode>.css</InlineCode>
        {' every day.'}
        <br />
        {'I like JavaScript ecosystem and currently learning '}
        <InlineCode>Three.js</InlineCode>
        {' Framework.'}
      </Text>

      <Stack lineHeight={1.8} gap={0.5} alignItems='flex-start'>
        <InternalLink
          href='/posts'
          color='text.secondary'
          underline='hover'
          fontSize={18}
        >
          <i className='twa twa-lg twa-memo'></i>
          <Box component='span' sx={{ ml: 1 }}>
            My writings
          </Box>
        </InternalLink>
        <InternalLink
          href='/projects'
          color='text.secondary'
          underline='hover'
          fontSize={18}
        >
          <i className='twa twa-lg twa-hammer-and-wrench'></i>
          <Box component='span' sx={{ ml: 1 }}>
            What have I built?
          </Box>
        </InternalLink>
        <InternalLink
          href='/snippets'
          color='text.secondary'
          underline='hover'
          fontSize={18}
        >
          <i className='twa twa-lg twa-robot'></i>
          <Box component='span' sx={{ ml: 1 }}>
            Useful snippets collected by me
          </Box>
        </InternalLink>
        <InternalLink
          href='/resume'
          color='text.secondary'
          underline='hover'
          fontSize={18}
        >
          <i className='twa twa-lg twa-briefcase'></i>
          <Box component='span' sx={{ ml: 1 }}>
            My resume
          </Box>
        </InternalLink>
        <InternalLink
          href='/about'
          color='text.secondary'
          underline='hover'
          fontSize={18}
        >
          <i className='twa twa-lg twa-face-with-monocle'></i>
          <Box component='span' sx={{ ml: 1 }}>
            More about me and this site
          </Box>
        </InternalLink>
      </Stack>

      <Text color='text.secondary' size='md' sx={{ mt: 4 }}>
        Happy reading!&nbsp;
        <Box
          component='span'
          sx={{
            verticalAlign: 'middle'
          }}
        >
          <i className='twa twa-lg twa-clinking-beer-mugs'></i>
        </Box>
      </Text>
    </Box>
  );
};

export default Description;
