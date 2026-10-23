const trackEvent = (
  eventName: string,
  data?: Record<string, string | number | boolean | null>
) => {
  // @ts-ignore
  const umami = window.umami;
  if (umami) {
    umami.track(eventName, data);
  }
};

const umami = {
  trackEvent
};

export default umami;
