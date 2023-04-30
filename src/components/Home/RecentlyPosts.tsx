import { Box, Stack } from '@mui/material';
import { Post } from 'contentlayer/generated';
import { getYear, parseISO } from 'date-fns';
import _ from 'lodash';

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
        color='text.primary'
        size='3xl'
        fontWeight={600}
        sx={{ mb: 7 }}
      >
        Recently Posts
      </Text>
      <Stack gap={3}>
        {Object.keys(groupedPosts)
          .sort((a, b) => +b - +a)
          .map(year => (
            <Box key={year}>
              <Text
                size='lg'
                fontWeight={600}
                sx={{
                  mb: 5
                }}
              >
                {year}
              </Text>
              <Stack gap={2}>
                {groupedPosts[year].map(post => (
                  <InternalLink
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    underline='none'
                    color='text.primary'
                  >
                    <Stack
                      direction='row'
                      gap={4}
                      alignItems='center'
                      sx={theme => ({
                        height: { xs: 100, sm: 60 },
                        padding: theme.spacing(0, 2),
                        margin: theme.spacing(0, -2),
                        borderRadius: theme.vars.shape['borderRadius-lg'],
                        '&:hover': {
                          color: theme.vars.palette.primary.main,
                          background: theme.vars.palette.primary.emphasis
                        }
                      })}
                    >
                      <Text
                        size='xs'
                        fontWeight={500}
                        color='text.secondary'
                        sx={{
                          minWidth: 60
                        }}
                      >
                        {formatDate(post.createdAt, 'MMM dd')}
                      </Text>
                      <Text
                        size='md'
                        fontWeight={500}
                        sx={{
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
        justifyContent='flex-end'
        sx={{
          mt: 6
        }}
      >
        <InternalLink
          href='/posts'
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
          All Posts
        </InternalLink>
      </Stack>
    </Box>
  );
};

export default RecentlyPosts;
