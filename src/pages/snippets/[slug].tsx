import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Snippet, allSnippets } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { MDXComponents } from '@/components/MDX';
import { Heading } from '@/components/TableOfContent/TableOfContent';
import { CommentConfig } from '@/configs/commentConfig';
import { SCROLL_OFFSET } from '@/constants';
import useHashFragment from '@/hooks/useHashFragment';
import SnippetLayout from '@/layouts/SnippetLayout';
import { getCommentConfig } from '@/lib/common/comment';
import { rehypeHeading } from '@/lib/rehype';

export type SnippetPageProps = {
  snippet: Snippet;
  headings: Heading[];
  commentConfig: Partial<CommentConfig>;
};

const SnippetPage: NextPage<SnippetPageProps> = ({
  snippet,
  headings,
  commentConfig
}) => {
  const MDXContent = useMDXComponent(snippet.body.code);
  useHashFragment(-1 * SCROLL_OFFSET);

  return (
    <SnippetLayout
      snippet={snippet}
      headings={headings}
      commentConfig={commentConfig}
    >
      <MDXContent components={MDXComponents} />
    </SnippetLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allSnippets
      .filter(snippet => {
        if (process.env.NODE_ENV === 'production') {
          return !snippet.ignore;
        } else {
          return true;
        }
      })
      .map(snippet => ({
        params: {
          slug: snippet.slug
        }
      })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  SnippetPageProps,
  {
    slug: string;
  }
> = async ({ params }) => {
  const snippet = allSnippets.find(snippet => snippet.slug === params!.slug);
  const { title, titleSlug } = snippet!;
  const commentConfig = getCommentConfig();

  const headings: Heading[] = [
    {
      id: titleSlug,
      title,
      level: 1
    }
  ];

  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHeading, { exportRef: headings })
    .use(rehypeStringify)
    .process(snippet!.body.raw);

  return {
    props: {
      snippet: snippet!,
      headings,
      commentConfig
    }
  };
};

export default SnippetPage;
