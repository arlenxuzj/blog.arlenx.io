const trackEvent = (
  eventName: string,
  data: Record<string, string | number> | undefined = undefined
) => {
  // @ts-ignore
  const umami = window.umami;
  if (umami) {
    data ? umami.track(eventName, data) : umami.track(eventName);
  }
};

const umami = {
  trackEvent
};

export default umami;
