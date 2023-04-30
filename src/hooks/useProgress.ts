/*
Copy and modify from
https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/main/core/hooks/useProgress.ts
*/

import React from 'react';

import { useMotionValueEvent, useScroll } from 'framer-motion';

const useProgress = () => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setReadingProgress(parseFloat(latest.toFixed(3)));
  });

  return readingProgress;
};

export default useProgress;
