import { GetStaticProps, NextPage } from 'next';

import { Page, allPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { MDXComponents } from '@/components/MDX';
import { DEFAULT_CONTENT_WIDTH, SCROLL_OFFSET } from '@/constants';
import useHashFragment from '@/hooks/useHashFragment';
import MDXPageLayout from '@/layouts/MDXPageLayout';

export type ResumePageProps = {
  page: Page;
};

const ResumePage: NextPage<ResumePageProps> = ({ page }) => {
  const MDXContent = useMDXComponent(page.body.code);
  useHashFragment(-1 * SCROLL_OFFSET);

  return (
    <MDXPageLayout
      page={page}
      contentWidth={DEFAULT_CONTENT_WIDTH}
      path='/resume'
    >
      <MDXContent components={MDXComponents} />
    </MDXPageLayout>
  );
};

export const getStaticProps: GetStaticProps<
  ResumePageProps,
  // @ts-ignore
  Page
> = async () => {
  const page = allPages.find(page => page.slug === 'resume');
  return {
    props: {
      page: page!
    }
  };
};

export default ResumePage;
