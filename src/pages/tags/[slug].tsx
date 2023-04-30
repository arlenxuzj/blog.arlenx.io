import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Box } from '@mui/material';
import { Post, Snippet, allPosts, allSnippets } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import { Text } from '@/components/Typography';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import PageLayout from '@/layouts/PageLayout';

import { default as PostPanel } from '../posts';
import { default as SnippetPanel } from '../snippets';

export type TagPageProps = {
  tag: string;
  posts: Post[];
  snippets: Snippet[];
};

const TagPage: NextPage<TagPageProps> = ({ tag, posts, snippets }) => {
  return (
    <PageLayout
      headTitle={`${tag}`}
      title={`Tag: #${tag}`}
      description={`Posts and snippets tagged with ${tag}`}
      contentWidth={DEFAULT_CONTENT_WIDTH}
      path={`/tags/${tag}`}
    >
      {posts.length ? (
        <Box
          sx={{
            width: '100%'
          }}
        >
          <Text component='h2' fontWeight={700} fontSize={30} sx={{ mb: 5 }}>
            Posts
          </Text>
          <PostPanel posts={posts} />
        </Box>
      ) : null}
      {snippets.length ? (
        <Box
          sx={{
            width: '100%'
          }}
        >
          <Text component='h2' fontWeight={700} fontSize={30} sx={{ mb: 5 }}>
            Snippets
          </Text>
          <SnippetPanel snippets={snippets} />
        </Box>
      ) : null}
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: string[] = [];
  const posts = allPosts.filter(post => !post.wip);
  const snippets = allSnippets.filter(snippet => !snippet.wip);

  posts.map(post => {
    post.tags.map(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  snippets.map(snippet => {
    snippet.tags.map(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  return {
    paths: tags.map(tag => ({
      params: {
        slug: tag
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  TagPageProps,
  {
    slug: string;
  }
> = async ({ params }) => {
  const tag = params!.slug;

  const posts = allPosts
    .filter(post => !post.wip)
    .filter(post => post.tags.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  const snippets = allSnippets
    .filter(snippet => !snippet.wip)
    .filter(snippet => snippet.tags.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return {
    props: {
      tag,
      posts,
      snippets
    }
  };
};

export default TagPage;
