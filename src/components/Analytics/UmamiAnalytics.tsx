import Script from 'next/script';

import analyticsConfig from '@/configs/analyticsConfig';

const UmamiAnalytics = () => {
  const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID;

  if (!UMAMI_ID) {
    return null;
  }

  return (
    <Script
      async
      defer
      data-website-id={UMAMI_ID}
      src={analyticsConfig.umamiUrl}
    />
  );
};

export default UmamiAnalytics;
