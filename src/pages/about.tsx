import { GetStaticProps, NextPage } from 'next';

import { Page, allPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { MDXComponents } from '@/components/MDX';
import MDXCodingStats from '@/components/MDX/Widgets/MDXCodingStats';
import { DEFAULT_CONTENT_WIDTH, SCROLL_OFFSET } from '@/constants';
import useHashFragment from '@/hooks/useHashFragment';
import MDXPageLayout from '@/layouts/MDXPageLayout';
import {
  WakatimeAllTimeSinceToday,
  allTimeSinceTodayApiURL
} from '@/services/wakatime/all-time-since-today';
import { WakatimeStats, statsApiURL } from '@/services/wakatime/stats';
import { fetcher } from '@/utils/fetcher';

export type AboutPageProps = {
  page: Page;
  wakatimeAllTimeSinceToday: WakatimeAllTimeSinceToday;
  wakatimeStats: WakatimeStats;
};

const AboutPage: NextPage<AboutPageProps> = ({
  page,
  wakatimeAllTimeSinceToday,
  wakatimeStats
}) => {
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
          MDXCodingStats: () => (
            <MDXCodingStats
              wakatimeAllTimeSinceToday={wakatimeAllTimeSinceToday}
              wakatimeStats={wakatimeStats}
            />
          )
        }}
      />
    </MDXPageLayout>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const page = allPages.find(page => page.slug === 'about');
  const wakatimeAllTimeSinceToday = await fetcher(allTimeSinceTodayApiURL);
  const wakatimeStats = await fetcher(statsApiURL);

  return {
    props: {
      page: page!,
      wakatimeAllTimeSinceToday,
      wakatimeStats: {
        data: {
          editors: wakatimeStats.data.editors,
          languages: wakatimeStats.data.languages,
          operating_systems: wakatimeStats.data.operating_systems,
          machines: wakatimeStats.data.machines
        }
      }
    }
  };
};

export default AboutPage;
