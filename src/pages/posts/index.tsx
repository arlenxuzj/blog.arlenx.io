import { GetStaticProps } from 'next';

import { Box, Stack } from '@mui/material';
import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc, parseISO } from 'date-fns';

import { InternalLink } from '@/components/Link';
import { Tag } from '@/components/Tag';
import { Text } from '@/components/Typography';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import PageLayout from '@/layouts/PageLayout';
import { formatDate } from '@/utils/date';

import { NextPageWithLayout } from '../_app';

export type PostsPageProps = {
  posts: Post[];
};

const PostsPage: NextPageWithLayout<PostsPageProps> = ({ posts }) => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Stack gap={8}>
        {posts.map(post => (
          <Box
            component='article'
            key={post.title}
            sx={{
              display: 'grid',
              gridTemplateRows: { xs: 'repeat(3, auto)', md: 'auto 1fr' },
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              rowGap: { xs: 2, md: 1 },
              alignItems: 'center'
            }}
          >
            <Text
              fontWeight={500}
              color='text.secondary'
              sx={{
                gridColumn: '1 / 2',
                gridRow: '1 / 2'
              }}
            >
              {formatDate(parseISO(post.createdAt))}
            </Text>
            <Text
              component={InternalLink}
              href={`/posts/${post.slug}`}
              color='text.primary'
              underline='none'
              size='2xl'
              fontWeight={600}
              sx={{
                gridColumn: { xs: '1 / 2', md: '2 / 5' },
                gridRow: { xs: '2 / 3', md: '1 / 2' }
              }}
            >
              {post.title}
            </Text>
            <Stack
              gap={2}
              sx={{
                gridColumn: { xs: '1 / 2', md: '2 / 5' },
                gridRow: { xs: '3 / 4', md: '2 / 3' }
              }}
            >
              <Stack direction='row' rowGap={1} columnGap={2} flexWrap='wrap'>
                {post.tags.map(tag => (
                  <Tag key={tag} label={tag} />
                ))}
              </Stack>
              <Text color='text.disabled'>{post.description}</Text>
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <InternalLink
                  href={`/posts/${post.slug}`}
                  underline='none'
                  color='text.primary'
                  className='arrow arrow-right'
                  fontSize={16}
                  sx={{
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  Read more
                </InternalLink>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  const posts = allPosts
    .filter(post => {
      if (process.env.NODE_ENV === 'production') {
        return !post.wip;
      } else {
        return true;
      }
    })
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return {
    props: {
      posts: posts
    }
  };
};

PostsPage.getLayout = page => {
  return (
    <PageLayout
      headTitle='Posts'
      description='I write about web development, programming, and other topics'
      path='/posts'
      contentWidth={DEFAULT_CONTENT_WIDTH}
    >
      {page}
    </PageLayout>
  );
};

export default PostsPage;
