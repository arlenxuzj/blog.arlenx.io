/*
Copy and modify from
https://gist.github.com/iDVB/a041da210605f05e0b36ac03ed403c00
*/

import { useEffect, useMemo } from 'react';

import throttle from 'lodash/throttle';

const useThrottledOnScroll = (callback: (() => void) | null, delay: number) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      // @ts-ignore
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export default useThrottledOnScroll;
