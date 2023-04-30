import { Box, Divider, Stack } from '@mui/material';
import { Snippet } from 'contentlayer/generated';
import { parseISO } from 'date-fns';

import { BlogMeta, BlogTags, BlogTitle } from '@/components/Blog';
import Comment from '@/components/Comment';
import { BackHomeLink, ExternalLink } from '@/components/Link';
import { MDXStyledArticle } from '@/components/MDX';
import { Pill } from '@/components/Pill';
import { Seo } from '@/components/Seo';
import { TableOfContent } from '@/components/TableOfContent';
import { Heading } from '@/components/TableOfContent/TableOfContent';
import { Text } from '@/components/Typography';
import { ContentWrapper } from '@/components/Wrapper';
import { CommentConfig } from '@/configs/commentConfig';
import siteMeta from '@/configs/siteMeta';
import { POST_CONTENT_WIDTH } from '@/constants';
import { formatDate } from '@/utils/date';

export type SnippetLayoutProps = {
  snippet: Snippet;
  headings: Heading[];
  commentConfig: Partial<CommentConfig>;
  children: React.ReactNode;
};

export const SnippetLayout = ({
  snippet,
  children,
  headings,
  commentConfig
}: SnippetLayoutProps) => {
  return (
    <>
      <Seo
        title={snippet.title}
        description={snippet.description}
        path={`/snippets/${snippet.slug}`}
        createdAt={snippet.createdAt}
        updatedAt={snippet.updatedAt}
        slug={snippet.slug}
        tags={snippet.tags}
      />
      <ContentWrapper main contentWidth={POST_CONTENT_WIDTH}>
        <Stack
          gridColumn={1}
          alignItems='flex-start'
          sx={{
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <TableOfContent headings={headings} />
        </Stack>
        <Stack gridColumn={2} alignItems='flex-start'>
          <MDXStyledArticle>
            <Stack
              gap={2}
              sx={{
                width: '100%',
                mb: 8
              }}
            >
              <Stack direction='row' justifyContent='flex-start'>
                <BackHomeLink />
              </Stack>
              <BlogTitle id={snippet.titleSlug} title={snippet.title} />
              <BlogTags tags={snippet.tags} />
              <BlogMeta
                type='snippet'
                slug={snippet.slug}
                createdAt={snippet.createdAt}
                readingTime={snippet.readingTime.text}
              />
              <Stack direction='row' gap={1} flexWrap='wrap'>
                {snippet.updatedAt && (
                  <Pill>{`Last Updated ${formatDate(
                    parseISO(snippet.updatedAt)
                  )}`}</Pill>
                )}
              </Stack>
            </Stack>
            {children}
          </MDXStyledArticle>
          <Box
            sx={{
              mt: 5,
              width: '100%'
            }}
          >
            <Divider />
            <Stack
              direction='row'
              justifyContent='flex-end'
              sx={{
                py: 2
              }}
            >
              <Text
                size='xs'
                color='text.secondary'
                component={ExternalLink}
                underline='none'
                href={`${siteMeta.repo}/blob/master/apps/web/contents/snippets/${snippet.fileName}`}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'transparent',
                  '&:hover': {
                    color: 'text.primary',
                    borderColor: 'text.primary'
                  }
                }}
              >
                View on GitHub
              </Text>
            </Stack>
            <Comment commentConfig={commentConfig} />
          </Box>
        </Stack>
      </ContentWrapper>
    </>
  );
};

export default SnippetLayout;
