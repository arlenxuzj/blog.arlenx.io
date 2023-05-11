import va from '@vercel/analytics';

import analyticsConfig from '@/configs/analyticsConfig';

import umami from './umami';

const trackEvent = (
  eventName: string,
  data: Record<string, string | number | boolean | null> | undefined = undefined
) => {
  if (analyticsConfig.umami) {
    umami.trackEvent(eventName, data);
  }

  if (analyticsConfig.vercel) {
    va.track(eventName, data);
  }
};

const analytics = {
  trackEvent
};

export default analytics;
