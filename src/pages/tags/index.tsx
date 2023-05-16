import { GetStaticProps } from 'next';

import { Box, Stack } from '@mui/material';
import { allPosts, allSnippets } from 'contentlayer/generated';
import { motion } from 'framer-motion';
import _ from 'lodash';

import { Tag } from '@/components/Tag';
import PageLayout from '@/layouts/PageLayout';

import { NextPageWithLayout } from '../_app';

export type Tag = {
  name: string;
  count: number;
};

export type TagsPageProps = {
  tags: Tag[];
};

const FONT_MIN = 14;
const FONT_MAX = 28;
const OPACITY_MIN = 0.6;
const OPACITY_MAX = 1;

const TagsPage: NextPageWithLayout<TagsPageProps> = ({ tags }) => {
  const tagsVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4 / tags.length
      }
    },
    hidden: {
      opacity: 0
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const totalTagNum = tags.reduce((acc, tag) => acc + tag.count, 0);

  return (
    <Stack
      component={motion.div}
      direction='row'
      gap={3.5}
      flexWrap='wrap'
      justifyContent='center'
      alignItems='center'
      initial='hidden'
      animate='visible'
      variants={tagsVariants}
    >
      {tags.map(tag => (
        <Box key={tag.name} component={motion.div} variants={itemVariants}>
          <Tag
            label={tag.name}
            sx={{
              borderBottom: '2px solid transparent',
              fontSize: Math.min(
                FONT_MIN +
                  ((tag.count / totalTagNum) * (FONT_MAX - FONT_MIN)) / 0.2,
                FONT_MAX
              ),
              opacity: Math.min(
                OPACITY_MIN +
                  ((tag.count / totalTagNum) * (OPACITY_MAX - OPACITY_MIN)) /
                    0.1,
                OPACITY_MAX
              ),
              '&:hover': {
                opacity: 1
              }
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
  const tags: Tag[] = [];
  const posts = allPosts.filter(post => !post.ignore);
  const snippets = allSnippets.filter(snippet => !snippet.ignore);

  posts.map(post => {
    post.tags.map(tag => {
      const existingTag = tags.find(t => t.name === tag);
      if (existingTag) {
        existingTag.count++;
      } else {
        tags.push({ name: tag, count: 1 });
      }
    });
  });

  snippets.map(snippet => {
    snippet.tags.map(tag => {
      const existingTag = tags.find(t => t.name === tag);
      if (existingTag) {
        existingTag.count++;
      } else {
        tags.push({ name: tag, count: 1 });
      }
    });
  });

  return {
    props: {
      tags: _.orderBy(tags, ['name'], ['asc'])
    }
  };
};

TagsPage.getLayout = page => {
  return (
    <PageLayout
      headTitle='Tags'
      description='Tags for posts and snippets'
      path='/tags'
    >
      {page}
    </PageLayout>
  );
};

export default TagsPage;
