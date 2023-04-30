import { GiscusProps } from '@giscus/react';

export type CommentConfig = GiscusProps & {
  lightTheme?: GiscusProps['theme'];
  darkTheme?: GiscusProps['theme'];
};

const commentConfig: CommentConfig = {
  // @ts-ignore
  repo: '', // process.env.GISCUS_REPO
  repoId: '', // process.env.GISCUS_REPO_ID
  category: '', // process.env.GISCUS_CATEGORY
  categoryId: '', // process.env.GISCUS_CATEGORY_ID
  mapping: 'title',
  reactionsEnabled: '1',
  emitMetadata: '1',
  inputPosition: 'bottom',
  lang: 'en',
  // loading: 'lazy',
  lightTheme: 'light',
  darkTheme: 'transparent_dark'
};

export default commentConfig;
