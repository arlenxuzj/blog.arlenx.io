export const umamiEventClass = (eventName: string, event = 'click') => {
  return `umami--${event}--${eventName}`;
};
