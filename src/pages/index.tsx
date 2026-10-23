import { GetStaticProps } from 'next';
import { compareDesc } from 'date-fns';
import { Description, RecentlyPosts } from '@/components/Home';
import { allPosts, Post } from '@/content/generated';
import DefaultLayout from '@/layouts/DefaultLayout';
import { NextPageWithLayout } from './_app';

export type IndexPageProps = {
  posts: Post[];
};

const IndexPage: NextPageWithLayout<IndexPageProps> = ({ posts }) => {
  return (
    <>
      <Description />
      <RecentlyPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt))
  );

  return {
    props: {
      posts
    }
  };
};

IndexPage.getLayout = page => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default IndexPage;
