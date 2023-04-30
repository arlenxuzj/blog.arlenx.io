import { NextPage } from 'next';
import Image from 'next/image';

import { Stack } from '@mui/material';

import { InternalLink } from '@/components/Link';
import { DefaultSeo } from '@/components/Seo';
import { Text } from '@/components/Typography';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <DefaultSeo title='Not Found' />
      <Stack
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 3
        }}
      >
        <Image
          src='/images/404.png'
          alt='404'
          width={500}
          height={500}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Text size='2xl' color='text.primary' sx={{ pb: 2 }}>
          Oops... looks like you got lost
        </Text>
        <Text color='text.secondary'>
          Something went wrong. Looks like this page doesn&apos;t exist anymore.
        </Text>
        <InternalLink
          href='/'
          underline='none'
          sx={{
            mt: 4,
            borderBottom: '2px solid',
            borderColor: 'transparent',
            '&:hover': {
              borderColor: 'primary.main'
            }
          }}
        >
          Go back to home
        </InternalLink>
      </Stack>
    </>
  );
};

export default NotFoundPage;
