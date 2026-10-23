import { GetStaticProps, NextPage } from 'next';
import { MDXComponents } from '@/components/MDX';
import MDXCodingStats from '@/components/MDX/Widgets/MDXCodingStats';
import { DEFAULT_CONTENT_WIDTH, SCROLL_OFFSET } from '@/constants';
import { allPages, Page } from '@/content/generated';
import { useMDXComponent } from '@/content/useMDXComponent';
import useHashFragment from '@/hooks/useHashFragment';
import MDXPageLayout from '@/layouts/MDXPageLayout';
import { getWakatimeData, type WakatimeData } from '@/services/wakatime';

export type AboutPageProps = {
  page: Page;
  wakatime: WakatimeData | null;
};

const AboutPage: NextPage<AboutPageProps> = ({ page, wakatime }) => {
  const MDXContent = useMDXComponent(page.body.code);
  useHashFragment(-1 * SCROLL_OFFSET);

  return (
    <MDXPageLayout
      page={page}
      contentWidth={DEFAULT_CONTENT_WIDTH}
      path='/about'
    >
      <MDXContent
        components={{
          ...MDXComponents,
          MDXCodingStats: () =>
            wakatime ? (
              <MDXCodingStats
                wakatimeAllTimeSinceToday={wakatime.allTime}
                wakatimeStats={wakatime.stats}
              />
            ) : (
              <p>Coding statistics are temporarily unavailable.</p>
            )
        }}
      />
    </MDXPageLayout>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const page = allPages.find(page => page.slug === 'about');
  const wakatime = await getWakatimeData();
  return {
    props: { page: page!, wakatime },
    revalidate: 3600
  };
};

export default AboutPage;
