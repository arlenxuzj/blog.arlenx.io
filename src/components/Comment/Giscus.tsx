import { default as GiscusComponent } from '@giscus/react';
import { useColorScheme } from '@mui/material';

import { CommentConfig } from '@/configs/commentConfig';

export type GiscusProps = {
  config: CommentConfig;
};

const Giscus = ({ config }: GiscusProps) => {
  const { mode } = useColorScheme();

  return (
    <GiscusComponent
      id='comments'
      repo={config.repo}
      repoId={config.repoId}
      category={config.category}
      categoryId={config.categoryId}
      mapping={config.mapping}
      reactionsEnabled={config.reactionsEnabled}
      emitMetadata={config.emitMetadata}
      inputPosition={config.inputPosition}
      lang={config.lang}
      loading={config.loading}
      theme={mode === 'dark' ? config.darkTheme : config.lightTheme}
    />
  );
};

export default Giscus;
