import { Box, Stack } from '@mui/material';
import { getYear, parseISO } from 'date-fns';
import _ from 'lodash';
import { Post } from '@/content/generated';
import { formatDate } from '@/utils/date';
import { InternalLink } from '../Link';
import { Text } from '../Typography';

export type RecentlyPostsProps = {
  posts: Post[];
};

const RecentlyPosts = ({ posts }: RecentlyPostsProps) => {
  const groupedPosts = _.groupBy(posts, post =>
    getYear(parseISO(post.createdAt))
  );

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Text
        component='h2'
        size='3xl'
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          mb: 7
        }}
      >
        Recently Posts
      </Text>
      <Stack
        sx={{
          gap: 3
        }}
      >
        {Object.keys(groupedPosts)
          .sort((a, b) => +b - +a)
          .map(year => (
            <Box key={year}>
              <Text
                size='lg'
                sx={{
                  fontWeight: 600,
                  mb: 5
                }}
              >
                {year}
              </Text>
              <Stack
                sx={{
                  gap: 2
                }}
              >
                {groupedPosts[year].map(post => (
                  <InternalLink
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    underline='none'
                    sx={{
                      color: 'text.primary'
                    }}
                  >
                    <Stack
                      direction='row'
                      sx={[
                        {
                          gap: 4,
                          alignItems: 'center'
                        },
                        theme => ({
                          height: { xs: 100, sm: 60 },
                          padding: theme.spacing(0, 2),
                          margin: theme.spacing(0, -2),
                          borderRadius: theme.vars.shape['borderRadius-lg'],
                          '&:hover': {
                            color: theme.vars.palette.primary.main,
                            background: theme.vars.palette.primary.emphasis
                          }
                        })
                      ]}
                    >
                      <Text
                        size='xs'
                        sx={{
                          fontWeight: 500,
                          color: 'text.secondary',
                          minWidth: 60
                        }}
                      >
                        {formatDate(post.createdAt, 'MMM dd')}
                      </Text>
                      <Text
                        size='md'
                        sx={{
                          fontWeight: 500,
                          flexGrow: 1
                        }}
                      >
                        {post.title}
                      </Text>
                    </Stack>
                  </InternalLink>
                ))}
              </Stack>
            </Box>
          ))}
      </Stack>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'flex-end',
          mt: 6
        }}
      >
        <InternalLink
          href='/posts'
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
          All Posts
        </InternalLink>
      </Stack>
    </Box>
  );
};

export default RecentlyPosts;
