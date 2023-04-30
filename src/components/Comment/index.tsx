import dynamic from 'next/dynamic';

import { CommentConfig } from '@/configs/commentConfig';

const Giscus = dynamic(() => import('./Giscus'), {
  ssr: false
});

export type CommentProps = {
  commentConfig: Partial<CommentConfig>;
};

const Comment = ({ commentConfig }: CommentProps) => {
  const { repo, repoId } = commentConfig;

  if (!repo || !repo.includes('/') || !repoId || repoId.length === 0) {
    return null;
  }

  return <Giscus config={commentConfig as CommentConfig} />;
};

export default Comment;
