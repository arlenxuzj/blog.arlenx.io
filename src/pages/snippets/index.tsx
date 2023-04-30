import { GetStaticProps } from 'next';

import { Box, Grid } from '@mui/material';
import { Snippet, allSnippets } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import SnippetCard from '@/components/Card/SnippetCard';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import PageLayout from '@/layouts/PageLayout';

import { NextPageWithLayout } from '../_app';

export type SnippetsPageProps = {
  snippets: Snippet[];
};

const SnippetsPage: NextPageWithLayout<SnippetsPageProps> = ({ snippets }) => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Grid container spacing={4}>
        {snippets.map(snippet => (
          <Grid item xs={12} md={6} key={snippet.title}>
            <SnippetCard snippet={snippet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<SnippetsPageProps> = async () => {
  const snippets = allSnippets
    .filter(snippet => !snippet.wip)
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return {
    props: {
      snippets: snippets
    }
  };
};

SnippetsPage.getLayout = page => {
  return (
    <PageLayout
      headTitle='Snippets'
      path='/snippets'
      description='Useful code snippets collected by me'
      contentWidth={DEFAULT_CONTENT_WIDTH}
    >
      {page}
    </PageLayout>
  );
};

export default SnippetsPage;
