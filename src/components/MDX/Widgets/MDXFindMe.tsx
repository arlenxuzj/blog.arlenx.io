import { Stack } from '@mui/material';

import siteMeta from '@/configs/siteMeta';

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
          {siteMeta.findMe.email}
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
          {siteMeta.findMe.github}
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
          {siteMeta.findMe.linkedin}
        </ExternalLink>
      </Stack>
    </Stack>
  );
};

export default MDXFindMe;
