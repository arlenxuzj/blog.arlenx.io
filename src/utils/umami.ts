const trackEvent = (
  eventName: string,
  data: Record<string, string | number> | undefined = undefined
) => {
  // @ts-ignore
  const umami = window.umami;
  if (umami) {
    data ? umami(eventName, data) : umami(eventName);
  }
};

const umami = {
  trackEvent
};

export default umami;
