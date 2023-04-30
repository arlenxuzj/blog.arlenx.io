import { GiscusProps } from '@giscus/react';

import commentConfig, { CommentConfig } from '@/configs/commentConfig';

export const getCommentConfig = (): Partial<CommentConfig> => {
  const repo = process.env.GISCUS_REPO;
  const repoId = process.env.GISCUS_REPO_ID;
  const category = process.env.GISCUS_CATEGORY;
  const categoryId = process.env.GISCUS_CATEGORY_ID;

  return {
    ...commentConfig,
    repo: repo as GiscusProps['repo'] | undefined,
    repoId,
    category,
    categoryId
  };
};
