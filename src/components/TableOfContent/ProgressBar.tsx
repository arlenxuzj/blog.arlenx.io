/*
Copy and modify from
https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/27074d0d3c/gatsby-theme-maximeheckel/components/TableOfContent/ProgressBar.tsx
*/

import { useEffect, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { ProgressBarWrapper } from './ProgressBar.styles';

const ProgressBar = ({ progress }: { progress: number }) => {
  const [visibility, setVisibility] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0
    },
    show: (visibility: boolean) => ({
      opacity: shouldReduceMotion ? 1 : visibility ? 1 : 0
    })
  };

  useEffect(
    () => setVisibility(progress >= 0.05 && progress <= 0.95),
    [progress]
  );

  return (
    <ProgressBarWrapper
      initial='hide'
      variants={progressBarWrapperVariants}
      animate='show'
      transition={{ type: 'spring' }}
      custom={visibility}
    >
      <motion.div
        style={{
          transformOrigin: 'top',
          scaleY: progress,
          width: '2px',
          backgroundColor: 'var(--palette-text-disabled)',
          height: '100%'
        }}
      />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
