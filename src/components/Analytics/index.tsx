import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

import analyticsConfig from '@/configs/analyticsConfig';

import GoogleAnalytics from './GoogleAnalytics';
import UmamiAnalytics from './UmamiAnalytics';

const isProduction = process.env.NODE_ENV === 'production';

const Analytics = () => {
  if (!isProduction) {
    return null;
  }

  return (
    <>
      {analyticsConfig.vercel && <VercelAnalytics />}
      {analyticsConfig.google && <GoogleAnalytics />}
      {analyticsConfig.umami && <UmamiAnalytics />}
    </>
  );
};

export default Analytics;
