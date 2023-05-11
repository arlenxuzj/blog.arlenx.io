import va from '@vercel/analytics';

import analyticsConfig from '@/configs/analyticsConfig';

import umami from './umami';

const trackEvent = (
  eventName: string,
  data?: Record<string, string | number | boolean | null>
) => {
  if (analyticsConfig.umami) {
    umami.trackEvent(eventName, data);
  }

  if (analyticsConfig.vercel) {
    data ? va.track(eventName, data) : va.track(eventName);
  }
};

const analytics = {
  trackEvent
};

export default analytics;
