import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Post, allPosts } from 'contentlayer/generated';
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
import PostLayout from '@/layouts/PostLayout';
import { getCommentConfig } from '@/lib/common/comment';
import { rehypeHeading } from '@/lib/rehype';

export type PostPageProps = {
  post: Post;
  headings: Heading[];
  commentConfig: Partial<CommentConfig>;
};

const PostPage: NextPage<PostPageProps> = ({
  post,
  headings,
  commentConfig
}) => {
  const { body } = post;
  const MDXContent = useMDXComponent(body.code);
  // const [mount, setMount] = useState(false);
  useHashFragment(-1 * SCROLL_OFFSET);

  return (
    <PostLayout post={post} headings={headings} commentConfig={commentConfig}>
      <MDXContent components={MDXComponents} />
    </PostLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts
      .filter(post => {
        if (process.env.NODE_ENV === 'production') {
          return !post.wip;
        } else {
          return true;
        }
      })
      .map(post => ({
        params: {
          slug: post.slug
        }
      })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  {
    slug: string;
  }
> = async ({ params }) => {
  const post = allPosts.find(post => post.slug === params!.slug);
  const { title, titleSlug } = post!;
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
    .process(post!.body.raw);

  return {
    props: {
      post: post!,
      headings,
      commentConfig
    }
  };
};

// @ts-ignore
PostPage.showHeaderProgressBar = true;

export default PostPage;
