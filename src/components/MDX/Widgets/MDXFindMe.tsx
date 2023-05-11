import { Stack } from '@mui/material';

import siteMeta from '@/configs/siteMeta';
import analytics from '@/utils/analytics';

import { DevSvgIcon } from '../../Icon';
import { ExternalLink } from '../../Link';

const MDXFindMe = () => {
  return (
    <Stack
      color='text.primary'
      gap={2.5}
      sx={{
        mt: 2,
        mb: 5
      }}
    >
      <Stack direction='row' gap={2} alignItems='center'>
        <DevSvgIcon
          name='Email'
          sx={{
            fontSize: 26
          }}
        />
        <ExternalLink href={`mailto:${siteMeta.findMe.email}`}>
          <span
            onClick={() => {
              analytics.trackEvent('about-email');
            }}
          >
            {siteMeta.findMe.email}
          </span>
        </ExternalLink>
      </Stack>
      <Stack direction='row' gap={2} alignItems='center'>
        <DevSvgIcon
          name='GitHub'
          sx={{
            fontSize: 26
          }}
        />
        <ExternalLink href={siteMeta.findMe.github}>
          <span
            onClick={() => {
              analytics.trackEvent('about-github');
            }}
          >
            {siteMeta.findMe.github}
          </span>
        </ExternalLink>
      </Stack>
      <Stack direction='row' gap={2} alignItems='center'>
        <DevSvgIcon
          name='LinkedIn'
          sx={{
            fontSize: 26
          }}
        />
        <ExternalLink href={siteMeta.findMe.linkedin}>
          <span
            onClick={() => {
              analytics.trackEvent('about-linkedin');
            }}
          >
            {siteMeta.findMe.linkedin}
          </span>
        </ExternalLink>
      </Stack>
    </Stack>
  );
};

export default MDXFindMe;
