import { useEffect } from 'react';

import { Stack } from '@mui/material';
import { parseISO } from 'date-fns';
import useSWR from 'swr';

import type { Post, Snippet } from '@/database';
import useGiscusData from '@/hooks/useGiscusData';
import { formatDate } from '@/utils/date';
import { fetcher } from '@/utils/fetcher';

import { Text } from '../Typography';

export type BlogMetaProps = {
  createdAt: string;
  readingTime: string;
  type: 'post' | 'snippet';
  slug: string;
};

const BlogMeta = ({ createdAt, readingTime, type, slug }: BlogMetaProps) => {
  const { data } = useSWR<Post | Snippet>(`/api/${type}/${slug}`, fetcher);
  const giscusData = useGiscusData();

  useEffect(() => {
    fetch(`/api/${type}/${slug}`, {
      method: 'POST'
    });
  }, [type, slug]);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      rowGap={1.5}
      sx={{
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <Stack direction='row' gap={0.8} color='text.secondary' flexWrap='wrap'>
        <Text>{formatDate(parseISO(createdAt))}</Text>
        <Text>/</Text>
        <Text>{readingTime}</Text>
      </Stack>
      <Stack direction='row' gap={0.8} color='text.secondary' flexWrap='wrap'>
        <Text>
          {data === undefined
            ? '--- views'
            : `${data === null ? 0 : data.count} views`}
        </Text>
        <Text>•</Text>
        <Text>
          {giscusData === undefined
            ? '--- comments'
            : `${
                giscusData === null
                  ? 0
                  : giscusData.discussion.totalCommentCount
              } comments`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default BlogMeta;
