import { Stack } from '@mui/material';

import { DefaultSeo } from '@/components/Seo';
import { ContentWrapper } from '@/components/Wrapper';

export type DefaultLayoutProps = {
  headTitle?: string;
  children: React.ReactNode;
};

const DefaultLayout = ({ headTitle, children }: DefaultLayoutProps) => {
  return (
    <>
      <DefaultSeo title={headTitle} />
      <ContentWrapper main>
        <Stack gridColumn={2} alignItems='flex-start' rowGap={8}>
          {children}
        </Stack>
      </ContentWrapper>
    </>
  );
};

export default DefaultLayout;
