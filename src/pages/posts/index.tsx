import { GetStaticProps } from 'next';
import { Box, Stack } from '@mui/material';
import { compareDesc, parseISO } from 'date-fns';
import { InternalLink } from '@/components/Link';
import { Tag } from '@/components/Tag';
import { Text } from '@/components/Typography';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import { allPosts, Post } from '@/content/generated';
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
      <Stack
        sx={{
          gap: 8
        }}
      >
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
              sx={{
                fontWeight: 500,
                color: 'text.secondary',
                gridColumn: '1 / 2',
                gridRow: '1 / 2'
              }}
            >
              {formatDate(parseISO(post.createdAt))}
            </Text>
            <Text
              component={InternalLink}
              href={`/posts/${post.slug}`}
              underline='none'
              size='2xl'
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                gridColumn: { xs: '1 / 2', md: '2 / 5' },
                gridRow: { xs: '2 / 3', md: '1 / 2' }
              }}
            >
              {post.title}
            </Text>
            <Stack
              sx={{
                gap: 2,
                gridColumn: { xs: '1 / 2', md: '2 / 5' },
                gridRow: { xs: '3 / 4', md: '2 / 3' }
              }}
            >
              <Stack
                direction='row'
                sx={{
                  rowGap: 1,
                  columnGap: 2,
                  flexWrap: 'wrap'
                }}
              >
                {post.tags.map(tag => (
                  <Tag key={tag} label={tag} />
                ))}
              </Stack>
              <Text
                sx={{
                  color: 'text.disabled'
                }}
              >
                {post.description}
              </Text>
              <Stack
                direction='row'
                sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <InternalLink
                  href={`/posts/${post.slug}`}
                  underline='none'
                  className='arrow arrow-right'
                  sx={{
                    color: 'text.primary',
                    fontSize: 16,

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
        return !post.ignore;
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
