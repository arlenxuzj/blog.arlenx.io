import { MDXStyledArticle } from '@/components/MDX';
import { Page } from '@/content/generated';
import PageLayout from './PageLayout';

export type MDXPageLayoutProps = {
  page: Page;
  contentWidth?: number;
  path: string;
  children: React.ReactNode;
};

const MDXPageLayout = ({
  page,
  contentWidth,
  path,
  children
}: MDXPageLayoutProps) => {
  return (
    <PageLayout
      headTitle={page.title}
      description={page.description}
      path={path}
      updatedAt={page.updatedAt}
      updateDateAtBuildTime={page.updateDateAtBuildTime}
      wip={page.wip}
      contentWidth={contentWidth}
    >
      <MDXStyledArticle>{children}</MDXStyledArticle>
    </PageLayout>
  );
};

export default MDXPageLayout;
