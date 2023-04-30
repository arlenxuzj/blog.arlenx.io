import { useEffect, useState } from 'react';

export const Reactions = {
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  LAUGH: '😄',
  HOORAY: '🎉',
  CONFUSED: '😕',
  HEART: '❤️',
  ROCKET: '🚀',
  EYES: '👀'
} as const;

export type Reaction = keyof typeof Reactions;

export type ReactionGroups = {
  [key in keyof typeof Reactions]: {
    count: number;
    viewerHasReacted: boolean;
  };
};

export interface User {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface DiscussionData {
  id: string;
  url: string;
  locked: boolean;
  repository: {
    nameWithOwner: string;
  };
  reactionCount: number;
  totalCommentCount: number;
  totalReplyCount: number;
  reactions: ReactionGroups;
}

export interface GiscusData {
  discussion: DiscussionData;
  viewer: User;
}

const useGiscusData = () => {
  const [giscusData, setGiscusData] = useState<GiscusData | undefined | null>(
    undefined
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      if (!(typeof event.data === 'object' && event.data.giscus)) return;

      const giscusData = event.data.giscus;

      if ('discussion' in giscusData) {
        setGiscusData(giscusData);
      } else if ('error' in giscusData) {
        setGiscusData(null);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return giscusData;
};

export default useGiscusData;
